import React from "react";
import { useSelector } from "react-redux";
import "./searchList.css";
import CourseCard from "./CourseCard";
const SearchList = () => {
  const { searchedQuery, searchResults } = useSelector((state) => state.search);
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        className="mt-3 mb-2"
      >
        <h1>
          {searchResults.length} Results for <q>{searchedQuery}</q>
        </h1>
      </div>

      {searchResults.length == 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
          className="mt-3 mb-2"
        >
          <div>
            <h1>No Courses Found</h1>
          </div>
          <img
            src={require("../assets/images/no-idea.png")}
            alt="nothing-found"
          />
        </div>
      ) : (
        <>
          <div className="course-list">
            {searchResults.map((course, index) => (
              <CourseCard
                courseId={course._id}
                key={index}
                title={course.title}
                image={course.image}
                instructor={course.instructor}
                rating={course.rating}
                releaseDate={course.releaseDate}
                peopleWatched={course.peopleWatched}
                category={course.category}
                disabled={false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchList;
