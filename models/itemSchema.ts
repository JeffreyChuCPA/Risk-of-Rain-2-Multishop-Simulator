import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: {
    type: Map,
    of: String
  },
  survivor: String,
  rarity: String,
});

const Item = mongoose.model("Item", itemSchema, "selected items");

export default Item