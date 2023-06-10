import express from "express"
import {
  createItem,
  getItems,
  deleteItem,
  updateItem,
} from "../controllers/product.controller";

const router  = express.Router();

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:id", deleteItem);
router.put("/:id", updateItem);

export default router;