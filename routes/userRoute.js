const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const { verifyToken } = require("../middleWare/authMiddleWare");

router.post("/register", user.registerUser);
router.post("/google-login", user.googleLogin);
router.post("/login", user.loginUser);
router.get("/user/:id", user.getUserById);
router.delete("/delete/:id", user.deleteUserById);
router.put(
  "/update",
  verifyToken,
  user.userUpdateHisProfile
);

module.exports = router;
