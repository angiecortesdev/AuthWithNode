import dotenv from 'dotenv'

import { Server } from './models/server'

import "colors";


//Configuring dotenv
dotenv.config()

const server = new Server();
