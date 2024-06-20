const router=require("express").Router();
const User=require("../models/user");
const userController=require("../controllers/userController");

router.post("/register",userController.addUser)
router.post("/login",userController.login)
module.exports=router;

