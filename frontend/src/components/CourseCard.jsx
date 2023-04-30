import React from "react";
import "./courseCard.css";
import { useNavigate } from "react-router-dom";
const CourseCard = ({
  courseId,
  title,
  image,
  instructor,
  rating,
  peopleWatched,
  releaseDate,
  category,
  disabled
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`courses/${courseId}`);
  };
  return (
    <div className="course-card">
      <div className="course-card-img">
        <img src={image} alt={title} />
        <div className="course-card-category">{category}</div>
      </div>
      <div className="course-card-content">
        <h3 className="course-card-title">{title}</h3>
        <div className="course-card-instructor">{instructor}</div>
        <div className="course-card-rating">
          <i className="fas fa-star-half-stroke course-card-rating-icon"></i>
          <span>{rating}</span>
          <span className="course-card-rating-total">({peopleWatched})</span>
        </div>
        <div className="course-card-details">
          <div className="course-card-students">{peopleWatched} students</div>
          <div className="course-card-price">
            <button
              onClick={handleClick}
              disabled={disabled}
              className="btn btn-primary"
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
