require("dotenv").config();
require("./models/config");
const express = require("express");
const app = express();
const commonRouter = require("./routes/commonRouter");

const bodyParser = require("body-parser");
const cors = require("cors");
const globalErrorHandler = require("./utils/errorHandler");
const AppError = require("./utils/appError");
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public/assets/images`));
app.use(cors());
app.use("/", commonRouter);

//for handling undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port no : ${process.env.PORT}`);
});
