const express = require("express");
const authRouter = require("./routes/auth");
const connectDB = require("./config/database");
const app = express();
const PORT = 5000;
const cors = require("cors");
const configCors = require("./config/corsConfig");
require("dotenv").config();

app.use(express.json());
app.use(cors(configCors));
app.use("/auth", authRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(`Server sucessfully listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database has not been connected", err);
  });
