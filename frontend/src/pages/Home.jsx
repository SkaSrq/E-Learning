import React, { useEffect, useState, CSSProperties } from "react";
import "./home.css";
import axios from "axios";
import CourseCard from "../components/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import SearchList from "../components/SearchList";
import { searched } from "../reduxSlices/search";

const Home = () => {
  const dispatch = useDispatch();
  const [liveCourses, setLiveCourses] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const searchStatus = useSelector((state) => state.search.status);
  const loading = useSelector((state) => state.loading.status);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/courses`
      );
      if (response.status != 200) {
        return new Error("no courses found");
      }
      const data = response.data;
      let liveCoursesArray = [];
      let upcomingCoursesArray = [];
      for (let course of data) {
        if (Date.parse(course.releaseDate) > Date.now())
          upcomingCoursesArray.push(course);
        else liveCoursesArray.push(course);
      }

      setLiveCourses(liveCoursesArray);
      setUpcomingCourses(upcomingCoursesArray);
    };
    const fetchCategories = async () => {
      const responseData = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category`
      );
      setCategories(responseData.data.categories);
    };
    fetchCourses();
    fetchCategories();
  }, []);
  const handleCategory = async (e, id, name) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/search-by-category-id?categoryId=${id}`
      );
      if (response.status !== 200) {
        console.log("axios error");
      }
      const searchResults = [];
      for (let course of response.data) {
        if (
          Date.parse(course.releaseDate) < Date.now() ||
          !course.releaseDate
        ) {
          searchResults.push(course);
        }
      }
      const searchQuery = name;
      dispatch(searched({ searchQuery, searchResults }));
    } catch (error) {
      console.log(error);
      throw "Something went wrong";
    }
  };
  return (
    <>
      <div className="c-container">
        {!searchStatus ? (
          <div className="home">
            <div className="banner">
              <h2>Learn new skills online with PHN</h2>
              <p>
                Join millions of learners and discover new skills, advance your
                career, and explore new hobbies with thousands of courses on PHN
              </p>
              <button className="btn btn-primary t-btn">Explore Courses</button>
            </div>
            <div className="featured-courses">
              <h2>Live Courses</h2>
              <div className="course-list">
                {liveCourses.map((course, index) => (
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
            </div>
            <div className="categories">
              <h2>Browse by Classes</h2>
              <div className="category-list">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="category-item"
                    onClick={(e) =>
                      handleCategory(e, category._id, category.name)
                    }
                  >
                    <i className={`fas fa-${index + 1}`}></i>
                    <h3>{category.name}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className="featured-courses">
              <h2>Upcoming Courses</h2>
              <div className="course-list">
                {upcomingCourses.map((course, index) => (
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
                    disabled={true}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <SearchList />
        )}
      </div>
    </>
  );
};

export default Home;
