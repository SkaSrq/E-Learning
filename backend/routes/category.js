const router = require("express").Router();
const categoryController = require("../controllers/category");
router.get("/", categoryController.findAll);
router.post("/", categoryController.saveCategory);

module.exports = router;
