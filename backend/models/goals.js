// This is to send the information to the database
const mongoose = require("mongoose");


// Save a refernce to the Schema Constructor
const Schema = mongoose.Schema;

// Using the Schema Constructor, create a goal
const GoalSchema = new Schema({
  // This is the category tag that the user will choose from - Can only have one
  tag: {
    type: String,
    required: true

  },
  // Title from the user that the user gives 
  title: {
    type: String,
    required: true
  },
  // This body is for the description that the user wants to give to the goal
  description: {
    type: String
  },
  checked: {
    type: Boolean,
    default: false
  },
  // This date is used to keep track of the goals since I want to add a feature of adding goals in future dates
  date: {
    type: String,
    required: true
  },
  systemDate: {
    type: Date,
    default: Date.now
  }
});

const Goals = mongoose.model("goals", GoalSchema);

module.exports = Goals