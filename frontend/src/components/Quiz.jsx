import React, { useEffect, useState } from "react";
import "./quiz.css";
import axios from "axios";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import QuizSuccessMessage from "./QuizSuccessMessage";
const Quiz = ({ setTakingQuizStatus, quizId }) => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const userEmail = useSelector((state) => state.user.email);
  const [answerSubmitted, setAnswerSubitted] = useState(false);

  const handleOptionClick = (questionId, optionId) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers.find(
      (answer) => answer.questionId === questionId
    );
    if (currentAnswer) {
      currentAnswer.optionId = optionId;
    } else {
      newAnswers.push({ questionId, optionId });
    }
    setAnswers(newAnswers);
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    const myAnswers = [];
    for (const answer of answers) {
      for (const question of quiz.questions) {
        if (answer.questionId === question.id) {
          for (const opt of question.options) {
            if (opt._id === answer.optionId) {
              const ansObj = {
                questionId: answer.questionId,
                answer: opt.text
              };
              myAnswers.push(ansObj);
            }
          }
        }
      }
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/quiz/result/save`,
        { userEmail: userEmail, quizId: quizId, answers: myAnswers }
      );
      if (response.status !== 200) {
        console.log("Error while fetching quiz");
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStatus(false);
      setAnswerSubitted(true);
      setTimeout(() => {
        setAnswerSubitted(false);
        setTakingQuizStatus(false);
      }, 3000);
    }
  };

  const handleQuit = () => {
    setTakingQuizStatus(false);
  };

  const currentQues = quiz?.questions[currentQuestion];

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/quiz/${quizId}`
        );
        if (response.status !== 200) {
          console.log("Error while fetching quiz");
          return;
        }
        setQuiz(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchQuizQuestions();
  }, []);
  return (
    <>
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          {answerSubmitted && <QuizSuccessMessage />}
          <div
            className="quizApp"
            style={{ filter: answerSubmitted ? "blur(1px)" : "" }}
          >
            <header className="header">
              <h1>PHN Quiz</h1>
            </header>
            <main className="main">
              <div className="question-container">
                <div className="question">
                  <h2>{currentQues.title}</h2>
                  <ul>
                    {currentQues.options.map((option) => (
                      <li
                        key={option._id}
                        className={`option ${
                          answers.find(
                            (answer) => answer.questionId === currentQues.id
                          )?.optionId === option._id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleOptionClick(currentQues.id, option._id)
                        }
                      >
                        {option.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="actions">
                  {currentQuestion > 0 && (
                    <button className="quiz-btn prev" onClick={handlePrevClick}>
                      Previous
                    </button>
                  )}
                  {currentQuestion < quiz.questions.length - 1 && (
                    <button className="quiz-btn next" onClick={handleNextClick}>
                      Next
                    </button>
                  )}
                  {currentQuestion === quiz.questions.length - 1 && (
                    <button
                      disabled={quiz.questions.length !== answers.length}
                      className="quiz-btn submit"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Submit
                    </button>
                  )}
                  <button className="quiz-btn quit" onClick={handleQuit}>
                    Quit
                  </button>
                </div>
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
