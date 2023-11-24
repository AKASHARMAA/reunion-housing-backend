const express = require("express");
const { Db } = require("mongodb");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const cors = require("cors");

const app = express();

mongoose.connect(
  "mongodb+srv://akash76648:QXGqheFCO1yq6bu6@akash.t5noifa.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());

app.use("/api/", userRoutes);
app.use("/api/", propertyRoutes);

app.listen(3000, () => console.log("Server is running..."));
