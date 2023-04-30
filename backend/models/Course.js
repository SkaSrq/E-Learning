const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  sequence: {
    type: Number,
    required: true
  }
});

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    instructor: {
      type: String,
      required: true
    },
    peopleWatched: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category"
    },
    description: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: false
    },
    videos: [videoSchema],
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Quiz"
    }
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
