const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [
      /^([\w-]|(?<!\.)\.)+[a-zA-Z0-9]@[a-zA-Z0-9]([\w\-]+)((\.([c|o|m|i|n]){2,3})+)$/i,
      "is invalid",
    ],
    index: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  googleId: {
    type: String, // Store Google's unique ID for the user
  },
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("user", userSchema);
