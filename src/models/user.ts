import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db'
import { Book } from './book'

const sequelize:Sequelize = db.sequelize

class User extends Model {
    declare username:string
    declare name:string
    declare email:string
    declare phoneNumber:string
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number' // Overwrite default field name conversion
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
})

// Relations
User.hasMany(Book, { foreignKey: 'book_id' })

export { 
    User
}