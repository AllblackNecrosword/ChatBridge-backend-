const Message = require("../Models/messageModel");

// const sentMessage = async (req, res) => {
//   //   res.json("sent Message");
//   try {
//     const { from, to, message } = req.body;
//     const data = await Message.create({
//       message: { text: message },
//       users: [from, to],
//       sender: from,
//     });
//     if (data) {
//       return res.status(200).json({ message: "Message added successfully" });
//     }
//     return res.status(400).json({ message: "Error to add message" });
//   } catch (error) {
//     console.log(error);
//   }
// };
const sentMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    console.log(req.body);

    if (!from || !to || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.status(200).json({ message: "Message added successfully" });
    }

    return res.status(400).json({ message: "Error adding message" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(projectedMessages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMessage,
  sentMessage,
};
