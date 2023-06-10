var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Product from "../models/product.model.js";
export const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newItem = yield Product.create(req.body);
        res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create item" });
    }
});
export const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Product.findAll();
        res.status(200).json(items);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve items" });
    }
});
export const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Product.destroy({ where: { id } });
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete item" });
    }
});
export const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [updatedRowsCount, updatedRows] = yield Product.update(req.body, {
            where: { id },
            returning: true,
        });
        if (updatedRowsCount === 0) {
            res.status(404).json({ error: "Item not found" });
        }
        else {
            res.status(200).json(updatedRows[0]);
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update item" });
    }
});
export default {
    createItem,
    getItems,
    deleteItem,
    updateItem,
};
