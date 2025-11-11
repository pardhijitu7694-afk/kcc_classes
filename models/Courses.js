const mongoose = require("mongoose");
const mdbConnection = require('../config/mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  duration: {
    type: String,
    default: null   // e.g. "3 Months"
  },
  price: {
    type: String,
    default: null
  },
  instructor: {
    type: String,
    default: null
  },
  category: {
    type: String,
    default: null
  }, reviews: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CourseModel = mdbConnection.model("Courses", CourseSchema);

module.exports = CourseModel
