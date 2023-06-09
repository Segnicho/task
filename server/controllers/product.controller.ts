import Product from "../models/product.model";

export const createItem = async (req, res) => {
  try {
    const newItem = await Product.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Product.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedRows] = await Product.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(updatedRows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

export default {
  createItem,
  getItems,
  deleteItem,
  updateItem,
};
