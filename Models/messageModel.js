// const mongoose = require("mongoose");

// const Message = mongoose.model(
//   "Message",
//   {
//     message: {
//       text: {
//         type: String,
//         require: true,
//       },
//     },
//     users: Array,
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = Message;
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
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

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
