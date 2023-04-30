const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
  {
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Question"
        }
      }
    ],
    passingMarks: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
