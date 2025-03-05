import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hashSync } from "bcryptjs";

 const router = express.Router()

router.post("/register",(req,res)=>{
    const { username, password } = req.body;
    //  ENCRYPTING THE PASSWORD USING BCRYPT
    const hashedPassword = bcrypt.hashSync(password,8);

    res.status(200).json({ message: "User registered successfully" });
})

export default router;