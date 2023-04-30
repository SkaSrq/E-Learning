import React from "react";

const QuizSuccessMessage = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        position: "absolute"
      }}
    >
      <div
        style={{
          height: "300px",
          width: "400px",
          color: "#FFF",
          fontSize: "26px",
          fontWeight: "bold",
          borderRadius: "10px",
          backgroundColor: "#4985f4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h2>Your Answer is Saved</h2>
        <h3>Thank You</h3>
      </div>
    </div>
  );
};

export default QuizSuccessMessage;
