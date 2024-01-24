import { DataTypes } from 'sequelize'
import sequlize from '../db/connection'

export const User = sequlize.define('user', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})