const mongoose = require("mongoose");

const userResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "skill",
  },

  
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      userAnswer: {
        type: String,
      },
    },
  ],
  score: {
    type: Number,
  },
});

userResultSchema.set("timestamps", true);

module.exports = mongoose.model("UserResult", userResultSchema);
