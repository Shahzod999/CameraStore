import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res
      .status(409)
      .json({
          ok: true,
          status: "success", // error
          error: "Already exists"
        });
    }

    const category = await new Category({ name }).save();
    res.json(category);
    // return res
    // .status(200)
    // .json({
    //   ok: true,
    //   data: category
    // });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);

    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

export { createCategory, removeCategory, listCategory, readCategory };
