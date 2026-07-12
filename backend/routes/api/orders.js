import express from "express";
import ordersController from "../../controllers/orders.js";
import ctrlWrapper from "../../helpers/ctrlWrapper.js";
import validateBody from "../../middlewares/validateBody.js";
import { createOrderSchema } from "../../schemas/orders.js";

const router = express.Router();

router.get("/", ctrlWrapper(ordersController.getAll));

router.get("/:id", ctrlWrapper(ordersController.getById));

router.post(
  "/",
  validateBody(createOrderSchema),
  ctrlWrapper(ordersController.create)
);

export default router;