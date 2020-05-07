const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  gender: {
    type: Number,
    require: true
  },
  userID: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Users", UserSchema);
