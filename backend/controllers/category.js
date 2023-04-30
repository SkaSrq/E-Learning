const Category = require("../models/Category");

const findAll = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};

const saveCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({
    name: name
  });
  try {
    await category.save();
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(400).json({ error: true, message: error.message });
  }
};
module.exports = { saveCategory, findAll };
