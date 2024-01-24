import { DataTypes } from 'sequelize'
import sequlize from '../db/connection'

export const Plan = sequlize.define('plan', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city:{
        type: DataTypes.STRING
    },
    country:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.FLOAT
    },
    quantity_plans: {
        type: DataTypes.INTEGER
    },
    rating:{
        type: DataTypes.FLOAT
    }
})