const express = require("express");
const app = express();
const morgan = require("morgan");

// Config
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    error: false,
    message: "API REST react-quiz",
  });
});

// catch error and forward to error handler
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(404).send({ error: true, message: "Method not found" });
  } else {
    next(err);
  }
});

// Server start
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
