const Question = require("../models/questionAnswermodel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const quizPaper = require("../models/questionPaperModel");
const { paginateArray } = require("../utils/paginate");
const skill = require("../models/skillmodel");
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const addQuestion = catchAsync(async (req, res, next) => {
  const { question, options, correctOption, skillType } = req.body;

  if (!question || !options) {
    return next(new AppError("Please provide all fields", 400));
  }

  const newQuestion = await Question.findOne({ question: question });
  if (newQuestion) {
    return next(new AppError("This Question already exists", 400));
  }

  let result = await Question.create({
    question,
    options,
    correctOption,
    skillType,
  });
  const new_ques = await result.save();
  res.status(201).json({
    status: "success",
    newQuestion: new_ques,
  });
});

const getAllQuestions = catchAsync(async (req, res, next) => {
  const allQuestion = await Question.find({}).sort({ _id: -1 });
  if (!allQuestion) {
    return next(new AppError("There are no Questions", 404));
  }
  res.status(200).json({
    success: true,
    allQuestion: allQuestion,
  });
});

const deleteQuestion = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const questions = await Question.findByIdAndDelete(id);
  if (!questions) {
    return next(new AppError("No such question exist", 404));
  }
  res.status(200).json({
    success: true,
    message: "question deleted",
  });
});

const questionsAddToThePaper = catchAsync(async (req, res, next) => {
  const { questions, name } = req.body;
  if (!questions || !name) {
    return next(new AppError("Please provide all the required fields", 500));
  }
  const numberOfQuestions = questions.length;
  const createPaper = await quizPaper.create({
    name,
    questions,
    totalQuestion: numberOfQuestions,
  });
  const Questions = await createPaper.save();
  res.status(201).json({
    success: true,
    Questions,
  });
});

// const getPaper = catchAsync(async (req, res, next) => {
//   const questionPaper = await quizPaper
//     .findOne({})
//     .populate("questions", { question: 1, options: 1 });
//   res.status(200).json({
//     paper: questionPaper,
//   });
// });

const getAllPaper = catchAsync(async (req, res, next) => {
  const questionPaper = await quizPaper
    .find({})
    .sort({ _id: -1 })
    .populate("questions", { question: 1, options: 1 });
  res.status(200).json({
    paper: questionPaper,
  });
});
const getPaperById = catchAsync(async (req, res, next) => {
  const { _id } = req.params;

  if (!_id) {
    return next(new AppError("Please provide paperId", 500));
  }
  console.log(_id, "id");
  const questionPaper = await quizPaper
    .find({ _id })
    // .sort({ _id: -1 })
    .populate("questions", { question: 1, options: 1 });
  res.status(200).json({
    paper: questionPaper,
  });
});

// const getPaper = catchAsync(async (req, res, next) => {
//   const page = req.query.page || 1;
//   const limit = req.query.limit || 1;

//   // const totalQuestions = await quizPaper.countDocuments({});
//   // const totalPages = Math.ceil(totalQuestions / limit);

//   // const skip = (page - 1) * limit;

//   const questionPaper = await quizPaper
//     .find({})
//     .populate("questions", { question: 1, options: 1 });
//   // .skip(skip)
//   // .limit(limit);
//   const currentPageData = paginateArray(
//     questionPaper[0].questions,
//     page,
//     limit
//   );
//   // console.log(currentPageData);

//   const filteredBody = filterObj(questionPaper, "paper");
//   console.log(filteredBody);
//   res.status(200).json({
//     // paper: questionPaper,
//     paper: currentPageData,
//     totalPages: questionPaper[0].questions.length,
//     currentPage: page,
//   });
// });

const createSkill = catchAsync(async (req, res, next) => {
  const { skillName } = req.body;
  if (!skillName) {
    return next(new AppError("please provide skillName", 500));
  }
  const checkedName = await skill.findOne({ skillName: skillName });
  if (checkedName) {
    return next(new AppError("this name is already taken", 500));
  }
  const newSkill = await skill.create({
    skillName,
  });
  const newSkillCreate = await newSkill.save();
  res.status(201).json({
    success: true,
    skilled: newSkillCreate,
  });
});

const getAllSkills = catchAsync(async (req, res, next) => {
  let skills = await skill.find({}).sort({ _id: -1 });
  res.status(200).json({
    success: true,
    data: skills,
  });
});

const getAllQuestionsBySkill = catchAsync(async (req, res, next) => {
  const { skillType } = req.params;
  const allQuestions = await Question.find({ skillType })
    .sort({ _id: -1 })
    .populate("skillType", { skillName: 1 });
  res.status(200).json({
    allQuestions,
  });
});

module.exports = {
  addQuestion,
  deleteQuestion,
  questionsAddToThePaper,
  // getPaper,
  getAllQuestions,
  getAllPaper,
  getPaperById,
  createSkill,
  getAllQuestionsBySkill,
  getAllSkills,
};
