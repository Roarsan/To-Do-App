import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

 const router = express.Router()

router.post("/register",(req,res)=>{
    const { username, password } = req.body;
    
   
    console.log(username, password);
    res.status(200).json({ message: "User registered successfully" });
})

export default router;