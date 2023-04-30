const courseService = require("../services/course");
const courses = async (req, res) => {
  try {
    return res.status(200).json(await courseService.getAllCoursesService());
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    return res.status(200).json(await courseService.getCourseService(courseId));
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const saveCourse = async (req, res) => {
  try {
    const {
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
    } = req.body;
    if (!title || !description || !videos || !quiz) {
      return res.status(404).json({
        error: true,
        message: "Bad request"
      });
    }
    return res
      .status(200)
      .json(
        await courseService.saveCourseService(
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
        )
      );
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};
const getCourseByName = async (req, res) => {
  try {
    const { q } = req.query;
    return res.status(200).json(await courseService.getCourseByNameService(q));
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const getCourseByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.query;
    return res
      .status(200)
      .json(await courseService.getCourseByCategoryIdService(categoryId));
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  courses,
  getCourse,
  saveCourse,
  getCourseByName,
  getCourseByCategoryId
};
