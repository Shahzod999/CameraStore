import express from "express";
import { addProduct, updateProductDetails, removeProduct, fetchProductById, fetchAllproducts, filterProducts } from "../controllers/productController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, addProduct);
router.get("/allproducts", fetchAllproducts);
router.route("/:id").get(fetchProductById).put(authenticate, updateProductDetails).delete(authenticate, removeProduct);
router.route("/filtered-products").post(filterProducts);

export default router;
