// api.js
// Router with the handlers for /api for the timestamp project

const express = require("express");

const router = express.Router();

// Object to return for invalid dates
const invalidDate = { error: "Invalid Date" };

// Timestamp with year, month, and day
// Basic range checks. Could check day valid range according to the month
router.get("/:yearStr(\\d{4})-:monthStr(\\d+)-:dayStr(\\d+)", (req, res) => {
  const month = +req.params.monthStr;
  if (month > 12) {
    res.json(invalidDate);
    return;
  }

  const day = +req.params.dayStr;
  if (day > 31) {
    res.json(invalidDate);
    return;
  }

  const date = new Date(Date.UTC(+req.params.yearStr, month - 1, day));

  res.json({
    utc: date.toUTCString(),
    unix: date.getTime(),
  });
});

// Timestamp in milliseconds
router.get("/:msStr(\\d+)", (req, res) => {
  const date = new Date(+req.params.msStr);

  res.json({
    utc: date.toUTCString(),
    unix: date.getTime(),
  });
});

// Timestamp as date string
router.get("/:dateStr", (req, res) => {
  const date = new Date(req.params.dateStr);

  if (isNaN(date)) {
    res.json(invalidDate);
  } else {
    res.json({
      utc: date.toUTCString(),
      unix: date.getTime(),
    });
  }
});

// Timestamp with empty date. Use curretn time
router.get("/", (req, res) => {
  const date = new Date();

  res.json({
    utc: date.toUTCString(),
    unix: date.getTime(),
  });
});

module.exports = router;
