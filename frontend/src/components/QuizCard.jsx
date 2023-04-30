import React from "react";
import "./videoCard.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
const QuizCard = ({ quizResult, setTakingQuizStatus }) => {
  return (
    <div className="ccc-container">
      <div className="video-image">
        <img src={require("../assets/images/quiz.png")} alt="title" />
      </div>
      <div className="quizCard-test-btn">
        {quizResult ? (
          <>
            <MDBContainer>
              <MDBRow className="mb-2">
                <MDBCol sm="4">
                  <div className="bold-name">Status</div>
                </MDBCol>
                <MDBCol
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "green"
                  }}
                  sm="4"
                >
                  Completed
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol sm="4">
                  <div className="bold-name">Score</div>
                </MDBCol>
                <MDBCol style={{ fontWeight: "bold", fontSize: "18px" }} sm="4">
                  {quizResult.score} <span> OUT OF </span>{" "}
                  {quizResult.totalScore}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </>
        ) : (
          <button
            onClick={() => setTakingQuizStatus(true)}
            className="btn btn-primary"
          >
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
