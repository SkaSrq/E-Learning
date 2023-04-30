import React, { useEffect, useState } from "react";
import "./course.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import VideoCard from "../components/VideoCard";
import QuizCard from "../components/QuizCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Quiz from "../components/Quiz";
const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [quizId, setQuizId] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const userEmail = useSelector((state) => state.user.email);
  const dateFormatter = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };
  const [takingQuizStatus, setTakingQuizStatus] = useState(false);
  const handleVideoChange = async (index) => {
    const cV = course.videos[index];
    setCurrentVideo(cV);
    handleScroll();
  };
  const handleScroll = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const responseData = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}`
      );
      if (responseData.status !== 200) {
        throw "Something went wrong";
      }
      setQuizId(responseData.data.quizId);
      setCurrentVideo(responseData.data.videos[0]);
      fetchQuizResult(responseData.data.quizId);
      responseData.data.releaseDate = dateFormatter(
        responseData.data.releaseDate
      );
      setCourse(responseData.data);
    };
    const fetchQuizResult = async (id) => {
      try {
        const responseData = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/quiz/results/q?userEmail=${userEmail}&quizId=${id}`
        );
        setQuizResult(responseData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStatus(false);
      }
    };
    const pathnameParts = window.location.pathname.split("/");
    const courseIdFromUrl = pathnameParts[pathnameParts.length - 1];
    setCourseId(courseIdFromUrl);
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, takingQuizStatus]);
  return (
    <>
      {loadingStatus ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {takingQuizStatus ? (
            <>
              <Quiz quizId={quizId} setTakingQuizStatus={setTakingQuizStatus} />
            </>
          ) : (
            <>
              <div className="container cc-container">
                <div className="content">
                  <div className="video-wrapper">
                    <iframe
                      width="100%"
                      height="720"
                      src={currentVideo.url}
                      title="Video Player"
                      allow="accelerometter; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="video-info">
                    <h1 className="video-title">{course.title}</h1>
                    <div className="details">
                      <div className="views">
                        {course.peopleWatched} views <span> • </span>
                        {course.releaseDate}
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="course-details">
                    <MDBContainer>
                      <MDBRow className="mb-2">
                        <MDBCol sm="4">
                          <div className="bold-name">Instructor</div>
                        </MDBCol>
                        <MDBCol sm="8">Sharique</MDBCol>
                      </MDBRow>
                      <MDBRow className="mb-2">
                        <MDBCol sm="4">
                          <div className="bold-name">Description</div>
                        </MDBCol>
                        <MDBCol sm="8">{course.description}</MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </div>
                </div>
                <div className="up-next">
                  {course.videos.map((video, index) => (
                    <div key={index} onClick={() => handleVideoChange(index)}>
                      <VideoCard
                        sequence={currentVideo.sequence}
                        index={index}
                        video={video}
                      />
                    </div>
                  ))}
                  <hr />
                  <QuizCard
                    setTakingQuizStatus={setTakingQuizStatus}
                    quizResult={quizResult}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Course;
