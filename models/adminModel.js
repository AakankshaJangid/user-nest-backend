const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    phone:{
        type : String,
        required: true,
    },
    gender:{
        type : String,
        required: true,
    },
    howDidYouHearAboutThis:{
        type : [String],
        required: true,
    },
    city:{
        type : String,
        required:true,
    },
    state:{
        type :String,
        required:true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin",adminSchema);
