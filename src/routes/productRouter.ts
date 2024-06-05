import express from "express";
import { ProductService } from "../services/ProductService";
import { productRepository } from "../repositories/ProductRepository";
import { ProductController } from "../controllers/Product/ProductController";
import { validateJWT } from "../middlewares/validateJWT/validateJWT";
import { validation } from "../middlewares/Validation/validation";

const JWT_SECRET = process.env.JWT_SECRET || "not found, will return error";

const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const router = express.Router();

router.get("/allProducts", productController.allProducts);
// router.post(
// 	"/newProduct",
// 	validateJWT(JWT_SECRET),
// 	validation(CategorySchema),
// 	productController.addNewProduct,
// );

export default router;
