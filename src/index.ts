import express, {Request,Response,Application} from 'express'
import http from 'http'
import cors from 'cors'
import userRoutes from './routes/user'
import saveBook from './controllers/book'

const PORT = process.env.PORT || 3000

const app:Application = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req:Request, res:Response):void => {
    res.send("Hello this a DOPAS Node.js server with TypeScript! Happy Coding :)")
})

/* CUSTOM ROUTES */
app.use('/users', userRoutes) // User

app.post('/books', (req:Request, res:Response) => {
    console.log('req.body', req.body)
    saveBook(req.body).then(ok => {
        if(ok) {
            res.status(200).send({ 'msg': 'Successfully saved book' })
        } else {
            res.status(500).send({ 'msg': 'Failed to save book' })
        }
    })
})

// 404 route
app.use((req:Request, res:Response) => {
    res.status(404).send("Route not found")
});

const server:http.Server = app.listen(PORT, ():void => {
    console.log(`Server Running here 👉 localhost:${PORT}`)
})

export default server