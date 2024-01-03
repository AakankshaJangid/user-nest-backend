const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Admin",
    },
    name: {
      type: String,
      require: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      require: [true, "Please add the contact phone number"],
    },
    creationTimestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
