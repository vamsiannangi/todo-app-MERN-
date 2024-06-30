const mongoose = require("mongoose");

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
