const router = require("express").Router();
const quizController = require("../controllers/quiz");
router.get("/results/q", quizController.findResult);
router.get("/:quizId", quizController.findQuiz);
router.post("/result/save", quizController.saveResult);

module.exports = router;
