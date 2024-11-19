import express from "express";
import formidable from "express-formidable";
import { addProduct, updateProductDetails, removeProduct, fetchProductById, fetchAllproducts, filterProducts, searchProducts, fetchBasketProducts } from "../controllers/productController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", formidable(), authenticate, addProduct);
router.get("/allproducts", fetchAllproducts);
router.get("/search", searchProducts);
router.post("/getBasket", fetchBasketProducts);
router.route("/:id").get(fetchProductById).put(authenticate, updateProductDetails).delete(authenticate, removeProduct);
router.route("/filtered-products").post(filterProducts);

export default router;
