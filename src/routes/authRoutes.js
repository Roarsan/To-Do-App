import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

 const router = express.Router()

router.post("/register",(req,res)=>{
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    console.log(username, password);
    res.status(200).json({ message: "User registered successfully" });
})

export default router;