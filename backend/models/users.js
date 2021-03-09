const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  sub: {
    type: String,
    required: true
  },
  goals: [
    {
      type: Schema.Types.ObjectId,
      ref: "goals"
    }
  ]
});

module.exports = Users = mongoose.model("users", UserSchema);
