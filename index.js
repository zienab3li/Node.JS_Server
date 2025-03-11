const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv=require("dotenv")
const cors = require("cors");
require("express-async-errors"); // Handles async errors
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const limiter = require("./middlewares/rate-limiter");
dotenv.config();
const postsRoutes = require("./routes/postssRoutes"); // Ensure this path is correct
const userRoutes = require("./routes/users");
const errorhandler = require("./middlewares/errorhandeler"); // Ensure this path is correct

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests
app.use(cors()); // Enable CORS
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(limiter);


// ROUTES
const V1_PREFIX = "/api/v1";
app.use(`${V1_PREFIX}/posts`, postsRoutes);
app.use(`${V1_PREFIX}/users`, userRoutes);
// handling not found routes
app.use((req, res, next) => {
  next(new APIError(`${req.method} ${req.path} is not found`, 404));
});
// global error handler
app.use(errorhandler);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
});