import Item from "../models/Item.js";

// ✅ CREATE ITEM
export const createItem = async (req, res) => {
  try {
    const { itemName, description, type, location, contactInfo } = req.body;

    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      contactInfo,
      user: req.user.id,
    });

    res.status(201).json(item);
  } catch (err) {
    console.log("CREATE ERROR:", err);
    res.status(500).json({ msg: "Error creating item" });
  }
};

// ✅ GET ITEMS
export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// ✅ DELETE ITEM
export const deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

// ✅ SEARCH
export const searchItems = async (req, res) => {
  const items = await Item.find({
    itemName: { $regex: req.query.name, $options: "i" },
  });
  res.json(items);
};