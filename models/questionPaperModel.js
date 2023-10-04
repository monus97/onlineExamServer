const mongoose = require("mongoose");
const questionPaper = new mongoose.Schema({
  name:{
    type : String
  },
questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  totalQuestion: {
    default: 0,
    type: Number,
  },
});
questionPaper.set("timestamps", true);
module.exports = mongoose.model("QuestionPaper", questionPaper);
