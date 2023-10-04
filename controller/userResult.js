const UserResult = require("../models/userResult");
const Question = require("../models/questionAnswermodel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const submitAnswer = catchAsync(async (req, res, next) => {
  const { skillId, answers } = req.body;
  const questions = await Question.find({
    _id: { $in: answers.map((ans) => ans.questionId) },
  });

  let score = 0;
  const userAnswers = await answers.map((userAnswer) => {
    const question = questions.find((q) => q._id.equals(userAnswer.questionId));
  
    if (question && question.correctOption === userAnswer.userAnswer) {
      score++;
    }
    return {
      question: userAnswer.questionId,
      userAnswer: userAnswer.userAnswer,
    };
  });


  const userResult = new UserResult({
    userId: req.user,
    skillId,
    answers: userAnswers,
    score: score,
  });
  await userResult.save();

  res
    .status(201)
    .json({ message: "Answers submitted successfully", score: score });
});


const showResult = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId, "user");
  const userResult = await UserResult.findOne({ userId })
    .sort({ _id: -1 })
    .populate("userId", { name: 1, _id: 0 })
    .populate("skillId", { skillName: 1, _id: 0 })
    .populate("answers", { userAnswer: 1 })
    .populate("answers.question", {
      question: 1,
      options: 1,
      correctOption: 1,
    });
  if (!userResult) {
    return next(new AppError("you have not attempt the paper", 400));
  }
  res.status(200).json({
    success: true,
    data: userResult,
  });
});

const getAllResult = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId, "user");
  if (!userId) {
    return next(new AppError("you have not attempt the paper", 400));
  }
  const userResult = await UserResult.find({})
    .populate("userId", { name: 1, _id: 0 })
    .populate("skillId", { skillName: 1, _id: 0})
    .populate("answers", { userAnswer: 1 })
    .populate("answers.question", {
      question: 1,
      options: 1,
      correctOption: 1,
    });

  if (!userResult) {
    return next(new AppError("you have not attempt the paper", 400));
  }
  res.status(200).json({
    success: true,
    data: userResult,
  });
});

module.exports = {
  submitAnswer,
  showResult,
  getAllResult,
  // showResultById,
};
