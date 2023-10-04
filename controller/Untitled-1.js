// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { userSubmitPaper } from "../redux/actions/authActions";
// import { successAlert } from "../utils/swal";

// const Exam = () => {
//   const dispatch = useDispatch();
//   const { paperReducer } = useSelector((state) => state);
//   // console.log(paperReducer.paperId.map((e)=>{
//   //   console.log(e,12341234)
//   // }), "paperReducer");
//   const { authReducer } = useSelector((state) => state);
//   // console.log(authReducer, "authReducer");
//   const [AllQuestions, setAllQuestions] = useState([]);
//   const [singleQuestion, setSingleQuestion] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   // console.log(selectedOption, "selectedOption form paper");
//   const [paperId, setPaperId] = useState("");
//   const [remainingTime, setRemainingTime] = useState(400 * 1000);
//   //  const [selectedOptions, setSelectedOptions] = useState({});
//   // console.log(selectedOption, "selectedOption");
//   // console.log(AllQuestions, paperReducer, 111111);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (paperReducer?.error === false) {
//       paperReducer.paperId.map((e) => {
//         console.log(e, "e");
//         setAllQuestions(e.questions);
//         setPaperId(e._id);
//       });
//     } else {
//       setAllQuestions([]);
//     }
//   }, [paperReducer]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRemainingTime((prevTime) => prevTime - 1);
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [authReducer.token]);

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };
//   useEffect(() => {
//     if (remainingTime === 0) {
//       submitPaper();
//       successAlert("time out ", "your response has been submitted");
//       navigate("/check");
//     }
//   }, [remainingTime]);
//   // const next = () => {
//   //   let obj = {
//   //     questionId: AllQuestions?.[singleQuestion]?._id,
//   //     userAnswer: selectedOption,
//   //   };
//   //   // if (selectedOption !== "") {
//   //   setSingleQuestion((prevState) => prevState + 1);
//   //   // }
//   // };
//   const next = () => {
//     setUserAnswers((prevAnswers) => [
//       ...prevAnswers,
//       {
//         questionId: AllQuestions?.[singleQuestion]?._id,
//         userAnswer: selectedOption,
//       },
//     ]);
//     setSingleQuestion((prevState) => prevState + 1);
//   };
//   const previous = () => {
//     if (singleQuestion > 0) {
//       setSingleQuestion((prevState) => prevState - 1);
//     }
//   };

//   // console.log(paperId,"paerId")

//   const submitPaper = () => {
//     // Add the user's selected answer for the current question before submitting
//     setUserAnswers((prevAnswers) => [
//       ...prevAnswers,
//       {
//         questionId: AllQuestions?.[singleQuestion]?._id,
//         userAnswer: selectedOption,
//       },
//     ]);
//     let userAns = {
//       paperId: paperId,
//       answers: userAnswers,
//     };
//     dispatch(userSubmitPaper(userAns));

//     // Add your submission logic here, for example, sending the answers to the backend.
//   };

//   // const handleOptionChange = (questionId, optionValue) => {
//   //   // Update the selected option for the given question
//   //   setSelectedOptions((prevOptions) => ({
//   //     ...prevOptions,
//   //     [questionId]: optionValue,
//   //   }));
//   // };

//   return (
//     <>
//       <div className=" container">
//         <div className="row">
//           <div className="exam_ques_section col-md-6">
//             <div className="exam_ques">
//               <span className="remaining_time">
//                 Remaining Time:{" "}
//                 <h4 style={{ color: "red" }}>{formatTime(remainingTime)}</h4>
//               </span>
//               <span className="paper_name">{paperReducer?.paperId?.name}</span>

//               <span>
//                 {/* {AllQuestions.length > 0 ? ( */}
//                 <h2>{AllQuestions[singleQuestion]?.question}</h2>
//                 {/* // ) : (
//             //   <p>No questions found.</p>
//             // )} */}
//               </span>
//               <div className="answer_section">
//                 {AllQuestions?.[singleQuestion]?.options.map((ele, i) => (
//                   <div className="chk_box" key={ele._id}>
//                     <span
//                       style={{ cursor: "pointer" }}
//                       onClick={() => setSelectedOption(ele.value)}
//                     >
//                       <input
//                         type="radio"
//                         name="answers"
//                         checked={selectedOption === ele?.value}
//                       />
//                       {/* <input
//                     type="radio"
//                     name={`question_${AllQuestions[singleQuestion]?._id}`}
//                     checked={
//                       selectedOptions[AllQuestions[singleQuestion]?._id] ===
//                       ele.value
//                     }
//                     onChange={() =>
//                       handleOptionChange(
//                         AllQuestions[singleQuestion]?._id,
//                         ele.value
//                       )
//                     }
//                   /> */}
//                       <span style={{ marginLeft: "10px" }}>{ele.value}</span>
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="button_group">
//                 <button className="btn_style" onClick={() => previous()}>
//                   Prev
//                 </button>
//                 <button className="btn_style" onClick={() => next()}>
//                   Next
//                 </button>
//                 <button className="btn_style" onClick={submitPaper}>
//                   finish
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="monu col-md-6">
//             <div className="rightquition container">
//               <div className="row box">
//                 <div className="small-box col-md-2">1</div>
//                 <div className="small-box col-md-2">2</div>
//                 <div className="small-box col-md-2">3</div>
//                 <div className="small-box  col-md-2">4</div>
//                 <div className="small-box col-md-2">5</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSubmitPaper } from "../redux/actions/authActions";
import { successAlert } from "../utils/swal";

const Exam = () => {
  const dispatch = useDispatch();
  const { paperReducer } = useSelector((state) => state);
  const { authReducer } = useSelector((state) => state);
  const [AllQuestions, setAllQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [paperId, setPaperId] = useState("");
  const [remainingTime, setRemainingTime] = useState(40 * 1000);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  console.log(754387, singleQuestion);
  useEffect(() => {
    if (paperReducer?.error === false) {
      paperReducer.paperId.map((e) => {
        setAllQuestions(e.questions);
        setPaperId(e._id);
      });
    } else {
      setAllQuestions([]);
    }
  }, [paperReducer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, [authReducer.token]);

  useEffect(() => {
    if (remainingTime === 0) {
      submitPaper();
      successAlert("Time out ", "Your response has been submitted");
      navigate("/check");
    }
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const next = () => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: AllQuestions?.[singleQuestion]?._id,
        userAnswer: selectedOption,
      },
    ]);
    setSingleQuestion((prevState) => prevState + 1);
  };

  const previous = () => {
    if (singleQuestion > 0) {
      setSingleQuestion((prevState) => prevState - 1);
    }
  };

  const handleQuestionClick = (index) => {
    if (userAnswers.some((ans) => ans.questionId === AllQuestions[index]._id)) {
      // If the question is answered, update the active question
      setSingleQuestion(index);
    } else {
      // If the question is unanswered, don't update the active question
      // You can show some indication to the user that the question is unanswered
      // For example, display a message, change the background color, etc.
    }
  };

  const submitPaper = () => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: AllQuestions?.[singleQuestion]?._id,
        userAnswer: selectedOption,
      },
    ]);
    let userAns = {
      paperId: paperId,
      answers: userAnswers,
    };
    dispatch(userSubmitPaper(userAns));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="exam_ques_section col-md-6">
            <div className="exam_ques">
              <span className="remaining_time">
                Remaining Time:{" "}
                <h4 style={{ color: "red" }}>
                  {formatTime(remainingTime / 1000)}
                </h4>
              </span>
              <span className="paper_name">{paperReducer?.paperId?.name}</span>

              <span>
                <h2>{AllQuestions[singleQuestion]?.question}</h2>
              </span>
              <div className="answer_section">
                {AllQuestions?.[singleQuestion]?.options.map((ele, i) => (
                  <div className="chk_box" key={ele._id}>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedOption(ele.value)}
                    >
                      <input
                        type="radio"
                        name="answers"
                        checked={selectedOption === ele?.value}
                      />
                      <span style={{ marginLeft: "10px" }}>{ele.value}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="button_group">
                <button className="btn_style" onClick={() => previous()}>
                  Prev
                </button>
                <button className="btn_style" onClick={() => next()}>
                  Next
                </button>
                <button className="btn_style" onClick={submitPaper}>
                  Finish
                </button>
              </div>
            </div>
          </div>
          <div className="monu col-md-6">
            <div className="rightquition container">
              <div className="row box">
                {AllQuestions.map((question, index) => (
                  <div
                    key={index}
                    className={`small-box col-md-2 ${
                      userAnswers.some((ans) => ans.questionId === question._id)
                        ? "answered"
                        : ""
                    } ${singleQuestion === index ? "active" : ""}`}
                    onClick={() => handleQuestionClick(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Exam;
