import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand, image } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !image:
        return res.json({ error: "Image is required" });
    }

    const existingProduct = await Product.findOne({ name, brand });

    if (existingProduct) {
      return res.status(409).json("Product with this name and brand already exists");
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

const fetchAllproducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).populate("category")
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const searchProducts = asyncHandler(async (req, res) => {
  const { name } = req.query;
  const valueName = name?.trim();
  console.log(!valueName);

  if (!valueName) {
    return res.status(404).json({ error: "Search query cannot be empty" });
  }

  try {
    const products = await Product.find({ name: { $regex: valueName, $options: "i" } }).populate("category")
    console.log(products.length == 0);
    if (products.length == 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;

    const products = await Product.find(args).populate("category")
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Serve Error" });
  }
});

const fetchBasketProducts = asyncHandler(async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length == 0) {
      return res.status(400).json({ error: "No product IDs provided" });
    }

    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

    const products = await Product.find({ _id: { $in: objectIds } }).populate("category");
    res.json(products);
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

export { addProduct, updateProductDetails, removeProduct, fetchProductById, fetchAllproducts, filterProducts, searchProducts, fetchBasketProducts };
