import express, { Router } from 'express'
import userController from '../controllers/user'

const router:Router = express.Router()

router.get('/', userController.get)
router.get('/:id', userController.getDetail)
router.post('/create', userController.insert)
router.put('/update', userController.update) // user id is supplied in req body
router.delete('/delete/:id', userController.destroy)

export default router