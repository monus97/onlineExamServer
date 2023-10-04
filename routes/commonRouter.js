const express = require('express');
const router = express.Router();
const user = require('../routes/userRoute')
const question = require('../routes/questionPaperRoute')
router.use('/user',user)
router.use("/question", question);
module.exports = router;