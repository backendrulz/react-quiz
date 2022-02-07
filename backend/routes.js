const util = require("util");
const express = require("express");
const router = express.Router();
const https = require("https");

const API_BASE_URL = "https://opentdb.com/api.php?amount=%d&type=%s";

/**
 * GET /status
 */
router.get("/status", (req, res) => {
  res.json({
    error: false,
    message: "OK",
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
  });
});

/**
 * GET /getQuiz/:number?/:type(boolean|multiple)?
 */
router.get("/getQuiz/:number?/:type(boolean|multiple)?", (req, res) => {
  const number = req.params.number ?? 5;
  const type = req.params.type ?? "multiple";

  https.get(util.format(API_BASE_URL, number, type), (resp) => {
    let data = "";

    // a data chunk has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // complete response has been received.
    resp
      .on("end", () => {
        res.json({
          error: false,
          results: JSON.parse(data).results,
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        res.json({
          error: true,
          message: "error in http request",
          results: 0,
        });
      });
  });
});

module.exports = router;
