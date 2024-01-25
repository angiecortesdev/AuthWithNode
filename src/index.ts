import dotenv from 'dotenv'
import "colors";
import { Server } from './models/server'


//Configuring dotenv
dotenv.config()

const server = new Server();

// server.listen();
