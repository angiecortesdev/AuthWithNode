import express, { Application } from 'express';
import routesPlans from '../routes/planes.routes';
import routesUser from '../routes/user.routes';
import { Plan } from './plan';
import { User } from './user';
import cors from 'cors'




export class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port =  process.env.PORT || '3002';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`.magenta)
        })
    }

    routes(){
        this.app.use('/api/plans', routesPlans)
        this.app.use('/api/users', routesUser)
    }

    midlewares(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    
    async dbConnect(){
        try {
            await Plan.sync()
            await User.sync()
        }catch (error) {
            console.log('Error al conectar a la base de datos'.red, error);
        }
    }
}

