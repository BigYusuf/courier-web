import React from "react";

const QuestionAns = ({ err, question, ans }) => {
  return (
    <div className="flex flex-col">
      <span className={`${err ? "text-red-500" : "text-black"} font-semibold`}>
        {question}
      </span>
      <span>{ans === "" ? " -" : " " + ans}</span>
    </div>
  );
};

export default QuestionAns;
