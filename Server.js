const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config(); // Add this line to load environment variables
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define the Routes
const userRoutes = require("./Routes/userRoute");

//Routes middleware
app.use("/", userRoutes);

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
