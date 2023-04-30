const Course = require("../models/Course");
const Question = require("../models/Question");
const Quiz = require("../models/Quiz");

const getAllCoursesService = async () => {
  try {
    const courses = await Course.find().populate("categoryId", "name");
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCourseService = async (courseId) => {
  try {
    const course = await Course.findOne({ _id: courseId });
    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getCourseByNameService = async (courseName) => {
  try {
    const courses = await Course.find({
      title: { $regex: courseName, $options: "i" }
    });
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCourseByCategoryIdService = async (categoryId) => {
  try {
    const courses = await Course.find({
      categoryId
    });
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const saveCourseService = async (
  title,
  description,
  videos,
  quiz,
  image,
  instructor,
  peopleWatched,
  rating,
  categoryId,
  releaseDate
) => {
  try {
    let questionIds = [];
    for (let question of quiz.questions) {
      const questionObj = new Question({
        title: question.title,
        options: question.options,
        answer: question.answer
      });
      const savedQuestion = await questionObj.save();
      questionIds.push({ questionId: savedQuestion._id });
    }

    const quizObj = new Quiz({
      questions: questionIds,
      passingMarks: quiz.passingMarks
    });
    const savedQuiz = await quizObj.save();

    const course = new Course({
      title,
      description,
      videos,
      quizId: savedQuiz._id,
      image,
      instructor,
      peopleWatched,
      rating,
      categoryId,
      releaseDate: new Date(releaseDate)
    });
    await course.save();

    return course;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  getAllCoursesService,
  getCourseService,
  saveCourseService,
  getCourseByNameService,
  getCourseByCategoryIdService
};
