const mongoose = require("mongoose");

const Team = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every team must have a name"],
    unique: [true, "Every team must have a unique name"],
  },
  abbreviation: {
    type: String,
    required: [true, "Every team must have an abbreviated name"],
  },
  fundation: {
    type: Number,
    required: [true, "Every team must have a fundation date"],
  },
});

const DataModel = mongoose.model("Team", Team);

module.exports = DataModel;
