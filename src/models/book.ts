import { Sequelize, Model, DataTypes } from 'sequelize'
import db from '../db'

const sequelize:Sequelize = db.sequelize;

class Book extends Model {}
Book.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: { 
        type: DataTypes.STRING,
        field: 'user_id',
        references: {
            model: 'users', // table name
            key: 'id', // column name in the users table
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    }
}, {
    sequelize,
    tableName: 'books',
    timestamps: true,
    createdAt: 'time_created_at',
    updatedAt: 'time_updated_at',
})

export {
    Book
}