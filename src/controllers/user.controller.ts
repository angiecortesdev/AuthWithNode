import { Request, Response } from "express";
import bycript from 'bcrypt'
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req: Request, res: Response) => {
    // Create a user object with the data sent in the request body.
    const { username, password } = req.body;

    //Validate if the user already exists in the database
    const user = await User.findOne({ where: { username: username } })

    if(user){
        res.status(400).json({
            msg: `There is already a user with the name ${username}`
        })
    }

    //Password encripted
    const hashedPassword = await bycript.hash(password, 10);

    try {
        //Save user in the database
        await User.create({
            username: username,
            password: hashedPassword
        })

        res.json({
            msg: `User ${username} created success`,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Opss an error occurred',
            error
        })
    }
}



export const loginUser = async(req: Request, res: Response) => {

    const { username, password } = req.body;
    
    
    //Validate if the user exists in the database
    const user: any = await User.findOne({ where: { username: username } })

    if(!user){
        return res.status(400).json({
            msg: `there isn't user with the name ${username}`
        })
    }

    //validate password
    const passwordValid = await bycript.compare(password, user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg:'Wrong password'
        })
    }

    //generate token

    const token = jwt.sign({
        username: username
    },process.env.SECRET_KEY || 'pizza123')


    res.json(token);
}


export const obtenerUsuario = (req: Request, res: Response) => {
    res.send('Hola nuevo ususario')

}