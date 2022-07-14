import { Request,Response } from 'express'
import db from '../db'
import { v4 as uuid } from 'uuid';
import { User } from '../models/user'
import Email from '../classes/email'
import sendMail from './send_email'
import { Book } from '../models/book'

// Get all users from DB
const get = async (req:Request, res:Response):Promise<void> => {
    try {
        const users:User[] = await User.findAll()
        res.status(200).type('json').send(JSON.stringify(users))
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
}

// Get a specific user from DB
const getDetail = async (req:Request, res:Response) => {
    try {
        let userId:string = req.params.id
        let user:User | null = await User.findOne({
            include: [
                Book,
            ],
            where: {
                id: userId
            }
        })

        res.status(200).type('json').send(JSON.stringify(user))
    } catch(err) {
        console.error(err)
        res.status(500).send()
    }
}

// Insert a new user & the books his/her own to DB
const insert = async (req:Request, res:Response):Promise<void> => {
    const t = await db.sequelize.transaction()
    try {
        // Generate a random unique ID using uuid library 
        let uid:string = uuid() 

        req.body.id = uid

        // save user
        await User.create(req.body, { transaction: t })

        // save books
        await Book.bulkCreate(req.body.books, { transaction: t })

        await t.commit().then(() => {
            // Commit successfully, send email notif the the user
            let emailBody = `Hi <b>${req.body?.username}</b>, <p>Your account has been added.</p> <p>Thank you.</p>`;
            
            let email:Email = new Email(
                null,
                null,
                req.body?.approverEmail,
                `New Account Notification for ${req.body.username}`,
                '',
                emailBody
            ) 
            sendMail(email)
        })
        res.status(200).send({ msg: "Successfully saved user & books" })
    } catch(err) {
        console.error(err)
        await t.rollback()
        res.status(500).send({ msg: "Failed to save user & books" })
    }
}

// Update existing user in the DB
const update = async (req:Request, res:Response):Promise<void> => {
    const t = await db.sequelize.transaction()
    try {
        let uid:string = req.body.id

        // Update user
        await User.update(req.body, {
            where: { id: uid }, 
            transaction: t
        })

        // Delete previous books
        await Book.destroy({
            where: { userId: uid },
            transaction: t
        })

        // Save new books
        await Book.bulkCreate(req.body.books, { transaction: t })

        await t.commit()
        res.status(200).send({ msg: "Successfully updated user" })
    } catch(err) {
        console.error(err)
        await t.rollback()
        res.status(500).send({ msg: "Failed to update user" })
    }
}

// Delete a specific user from the DB
const destroy = async(req:Request, res:Response):Promise<void> => {
    let uid = req.params.id
    if(!uid) res.status(400).send({ msg: "Failed to delete User. Id is not presented" })
    try {
        await User.destroy({
            where: { id: uid } 
        })
        res.status(200).send({ msg: "Successfully delete user " + uid })
    } catch(err) {
        console.error(err)
        res.status(500).send({ msg: "Failed to delete user " + uid })
    }
}

export default {
    get,
    getDetail,
    insert,
    update,
    destroy,
}