const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         mongoose.set('debug', true); // Enable Mongoose debugging
//         await mongoose.connect("mongodb+srv://vamsi:vamsi123@cluster1.t55ubgk.mongodb.net/");
//         console.log("Connected to MongoDB");
//     } catch (err) {
//         console.error("MongoDB connection error:", err);
//         process.exit(1);
//     }
// };


const dbConnect=async()=>{
    try{
        await mongoose.connect("mongodb+srv://vamsi:vamsi123@cluster1.t55ubgk.mongodb.net/");
        console.log("connected to database");
      }
 catch(err){
    console.error("MongoDB connection error:", err);
 }
};
dbConnect();
