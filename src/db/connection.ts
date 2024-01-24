import { Sequelize } from "sequelize";

const sequelize = new Sequelize('travel_agency', 'angiecdev', 'admin1234', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize;