const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Item = require("./models/itemSchema");
const cors = require("cors");
const dotenv = require('dotenv');


dotenv.config()

const corsOptions = {
  origin: process.env.FE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(express.json()) //*body parser middleware
app.use(cors(corsOptions)) //*allow requests from any origin

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const databaseURL = process.env.DATABASE_URL

if (!databaseURL) {
  console.error("DATABASE_URL environment variable is not set.");
  process.exit(1); // Exit the process if DATABASE_URL is not set
}

mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected to Mongodb..."))
  .catch((err) => console.error("Could not connect to Mongodb...", err));


app.post("/api/results", async (req, res) => {
  console.log(req.body);
  
  const postItem = async () => {
    for (let i = 0; i < req.body.userItems.length; i++) {
      const postItem = new Item({
        item: req.body.userItems[i],
        survivor: req.body.userSurvivor.name,
        rarity: req.body.userItems[i].rarity
      });
      await postItem.save();
    }
  };

  await postItem();
  res.send(req.body);
});

app.get("/api/results/:survivor", async (req, res) => {
  const retrieveItems = async (rarity, survivor) => {
    const matchStage = survivor ? { $match: { rarity: rarity, survivor: survivor } } : { $match: { rarity: rarity } }

    const items = await Item.aggregate([
      matchStage,
      { $group: { _id: "$item.itemName", count: { $sum: 1 }, description: {$first: "$item.description"} } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: {_id: 1, count: 1, rarity: rarity, description: 1}}
    ]);
    return items;
  };

  const commonItems = await retrieveItems("Common");
  const uncommonItems = await retrieveItems("Uncommon");
  const legendaryItems = await retrieveItems("Legendary");
  const commonSurvivorItems = await retrieveItems("Common", req.params.survivor);
  const uncommonSurvivorItems = await retrieveItems("Uncommon", req.params.survivor);
  const legendarySurvivorItems = await retrieveItems("Legendary", req.params.survivor);
  
  
  res.send({ commonItems, uncommonItems, legendaryItems, commonSurvivorItems, uncommonSurvivorItems, legendarySurvivorItems });

});

app.get('/', (req, res) => {
  res.send('Server is running.');
});
