import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headeToken = req.headers['authorization'];

    if(headeToken != undefined && headeToken.startsWith('Bearer ')){
        //Have token

        try {
            const bearerToken = headeToken.slice(7)
            jwt.verify(bearerToken, process.env.SECRET_KEY || 'pizza123');
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Invalid token'
            })
        }

    }else {
        res.status(401).json({
            msg: `Access denied`
        })
    }
}


export default validateToken;