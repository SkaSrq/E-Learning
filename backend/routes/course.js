const router = require("express").Router();
const courseController = require("../controllers/course");
router.get("/", courseController.courses);
router.get("/search", courseController.getCourseByName);
router.get("/search-by-category-id", courseController.getCourseByCategoryId);
router.get("/:courseId", courseController.getCourse);
router.post("/save", courseController.saveCourse);

module.exports = router;
