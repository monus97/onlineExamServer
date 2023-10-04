
const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});

const questionAnswerSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
  skillType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skill",
  },
});

questionAnswerSchema.set("timestamps", true);

module.exports = mongoose.model("Question", questionAnswerSchema);