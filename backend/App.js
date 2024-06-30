const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection");
const authRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todo");

app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1/todos", todoRoutes);

const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
