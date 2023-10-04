const express = require("express");
const router = express.Router();
const question = require("../controller/questionPaper");
const { verifyToken, restrictTo } = require("../middleWare/authMiddleWare");
const userResult = require("../controller/userResult");

router.post("/add", verifyToken, restrictTo("admin"), question.addQuestion);
router.get(
  "/getallquestions",
  verifyToken,
  restrictTo("admin"),
  question.getAllQuestions
);
router.delete(
  "/delete/:id",
  verifyToken,
  restrictTo("admin"),
  question.deleteQuestion
);
router.post(
  "/createPaper",
  verifyToken,
  restrictTo("admin"),
  question.questionsAddToThePaper
);
router.post("/submitanswer", verifyToken, userResult.submitAnswer);
 router.get("/result", verifyToken, userResult.showResult);
 router.post("/skill", verifyToken, restrictTo("admin"), question.createSkill);
 router.get("/skill", verifyToken, question.getAllSkills);
 router.get("/skill/:skillType", verifyToken, question.getAllQuestionsBySkill);
// router.get("/result/:id", verifyToken, userResult.showResultById);
router.get(
  "/allresults",
  verifyToken,
  restrictTo("admin"),
  userResult.getAllResult
);

router.get("/getpaperbyId/:_id", verifyToken, question.getPaperById);
router.get("/getallpaper", verifyToken, question.getAllPaper);
module.exports = router;
