const User=require("../models/user");
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: hashedPassword });
      await user.save();
      res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};



const login=async(req,res)=>{
    const {email,password}=req.body;
   try{ const existingUser=await User.findOne({email:email});
    if (!existingUser) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
     
      let payload={
        user:{
          id:existingUser.id
        }
      }
      jwt.sign(payload,'jwtSecurity',{expiresIn:3600000},(err,token)=>{
if(err) throw err;
return res.json({token});
      })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }   
}



module.exports={addUser,login};
