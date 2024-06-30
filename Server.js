const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socket = require("socket.io");
const http = require("http");

dotenv.config(); // Add this line to load environment variables
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define the Routes
const userRoutes = require("./Routes/userRoute");
const messageRoute = require("./Routes/messageRoute");

//Routes middleware
app.use("/", userRoutes);
app.use("/message", messageRoute);

//Connecting to mongosh
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect", error);
  });

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });

});
// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const socket = require("socket.io");
// const http = require("http");

// dotenv.config(); // Add this line to load environment variables
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Define the Routes
// const userRoutes = require("./Routes/userRoute");
// const messageRoute = require("./Routes/messageRoute");

// // Routes middleware
// app.use("/", userRoutes);
// app.use("/message", messageRoute);

// // Connecting to MongoDB
// const PORT = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.URL)
//   .then(() => {
//     console.log("Database connected Successfully");

//     const server = http.createServer(app);

//     const io = socket(server, {
//       cors: {
//         origin: "http://localhost:5173",
//         credentials: true,
//       },
//     });

//     global.onlineUsers = new Map();

//     io.on("connection", (socket) => {
//       global.chatSocket = socket;
//       socket.on("add-user", (userId) => {
//         onlineUsers.set(userId, socket.id);
//       });

//       socket.on("send-msg", (data) => {
//         const sendUserSocket = onlineUsers.get(data.to);
//         if (sendUserSocket) {
//           socket.to(sendUserSocket).emit("msg-recieve", data.message);
//         }
//       });
//     });

//     server.listen(PORT, () => {
//       console.log(`Server is running on port : http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("Failed to connect", error);
//   });
