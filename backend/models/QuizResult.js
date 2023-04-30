const mongoose = require("mongoose");
const quizResultSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
      },
      answer: {
        type: String,
        required: true
      }
    }
  ],
  score: {
    type: Number,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  }
});
quizResultSchema.index({ userEmail: 1, quizId: 1 }, { unique: true });
const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;
