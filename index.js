const express = require("express");
const cors = require("cors");
const { connection } = require("mongoose");
const { userRouter } = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Db connected successfully");
    console.log("connected to the port 8080");
  } catch (error) {
    console.log(error);
  }
});
