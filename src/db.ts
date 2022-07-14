import { Sequelize } from "sequelize";

const dbName:string = '[DB NAME]'
const dbUsername:string = '[DB USERNAME]'
const dbPassword:string = '[DB PASSWORD]'
const dbHost:string = '[DB SERVER IP]'
const sequelize:Sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'mysql', // MySQL database
    timezone: '+07:00' // GMT +7
})

async function testConnection():Promise<boolean> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false
    }
}

export default {
    sequelize,
    testConnection
}