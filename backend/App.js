const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/connection");
const authRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todo");

// const middleware = require('./controllers/middleware'); // Import middleware

app.use(cors());
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1/todos", todoRoutes);

// Use middleware for /myprofile route
// app.get('/myprofile', middleware, async (req, res) => {
//   try {
//     let exist = await Registeruser.findById(req.user.id);
//     if (!exist) {
//       return res.status(400).send('User not found');
//     }
//     res.json(exist);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send('Server Error');
//   }
// });

const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
