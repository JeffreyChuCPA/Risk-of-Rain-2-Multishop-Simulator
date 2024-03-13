import express from "express";
const app = express();
import mongoose from "mongoose";
import Item from "../models/itemSchema";
import cors from "cors"

app.use(express.json()) //*body parser middleware
app.use(cors()) //*allow requests from any origin

const PORT: string | 5000 = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose
  .connect("mongodb://localhost/RoR2-Multishop-Simulator")
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
  const retrieveItems = async (rarity: string, survivor?: string) => {
    const matchStage = survivor ? { $match: { rarity: rarity, survivor: survivor } } : { $match: { rarity: rarity } }

    const items = await Item.aggregate([
      matchStage,
      { $group: { _id: "$item.itemName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: {_id: 1, count: 1, rarity: rarity}}
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
