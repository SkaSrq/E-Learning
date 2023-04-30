const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");

const findResult = async (req, res) => {
  try {
    const { userEmail, quizId } = req.query;
    const quizResult = await QuizResult.findOne({
      userEmail: userEmail,
      quizId: quizId
    });
    return res.status(200).json(quizResult);
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
const findQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quizDBObj = await Quiz.findOne({ _id: quizId }).populate(
      "questions.questionId"
    );
    const questionsArray = [];
    for (let question of quizDBObj.questions) {
      const { _id, title, options, ...data } = question.questionId;
      questionsArray.push({ id: _id, title: title, options: options });
    }
    const quiz = {
      id: quizDBObj._id,
      passingMarks: quizDBObj.passingMarks,
      createdAt: quizDBObj.createdAt,
      updatedAt: quizDBObj.updatedAt,
      questions: questionsArray
    };
    return res.status(200).json(quiz);
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
const saveResult = async (req, res) => {
  try {
    const { userEmail, quizId, answers } = req.body;
    const quizDBObj = await Quiz.findOne({ _id: quizId }).populate(
      "questions.questionId"
    );
    let score = 0;
    for (let question of quizDBObj.questions) {
      const { answer } = question.questionId;
      for (let ansObj of answers) {
        if (ansObj.answer == answer) {
          score += 1;
        }
      }
    }
    const quizResultObj = new QuizResult({
      userEmail: userEmail,
      quizId: quizId,
      answers: answers,
      score: 5 * score,
      totalScore: 5 * answers.length
    });
    const savedQuizResult = await quizResultObj.save();
    return res.status(200).json(savedQuizResult);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
module.exports = { findResult, findQuiz, saveResult };
