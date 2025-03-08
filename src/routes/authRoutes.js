import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

 const router = express.Router()

router.post("/register",(req,res)=>{
    //get the username and password from the request
    const { username, password } = req.body;
    //  ENCRYPTING THE PASSWORD USING BCRYPT
    const hashedPassword = bcrypt.hashSync(password,8);


    // save the new user and hashed password to the db
    try {
        //prepare the query & execute in result
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token with the user's id
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post("/login",(req,res)=>{
    const { username, password } = req.body;

    try {

        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        
        const user = getUser.get(username)

        if (!user) {
            return res.status(401).json({ message: 'use not found' })
        }

        // compare the password from the request to the user's password
        const Password = bcrypt.compareSync(password, user.password)
        
        if (!Password) {
            return res.status(401).json({ message: 'Invalid  password' })
        }

        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(503);
    }

})

export default router;