import express from "express";
import categoryRoutes from "./categoryRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRouter";

const router = express.Router();

// User routes
router.use(userRoutes);

// Category routes
router.use(categoryRoutes);

// Product routes
router.use(productRoutes);

export { router };
