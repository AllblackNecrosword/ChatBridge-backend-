const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  {
    message: {
      text: {
        type: String,
        require: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Message;
