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


export const obtenerUsuarios = async (req: Request, res: Response) => {
    const usuarios = await User.findAll();

    res.json({ usuarios })
}

//Obtener usuario por id
export const obtenerUsuario = async (req: Request, res: Response) => {

    const { id } = req.params
    const usuarioPorId = await User.findByPk( id );
    if (usuarioPorId) {
        res.json({ usuarioPorId })
    }else {
        res.status(404).json({
            msg:`No se ha encontrado el usuario con la ID "${id}"`
        })
    }

}


//Actualizar usuarios

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params
    const { body } = req;

    try {
        //Verificar si existe el usuario a actualizar
        const usuario = await User.findByPk( id )
        if( !usuario){
            return res.status(404).json({
                msg:'El usuario no existe con el id' + id
            })
        }
        await usuario.update( body );
        res.json( usuario );
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador' 
        })
    }

}


export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params
    
    
    const usuario = await User.findByPk( id )
    if( !usuario){
           return res.status(404).json({
            msg:'El usuario no existe con el id' + id
        })
    }

    await usuario.update({estado: false})

    res.json({
        msg: `Usuario  ${id } borrado`
    })

}