import axios from 'axios'
import { ClientRequest, request } from 'http'
import supertest from 'supertest'
import server from '../index'

describe('User controller tests', () => {
    test('Get all users', async () => {
        const req = supertest(server)
        await req
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                console.log('User list', res.body)
            })
        server.close()
    })

    test.only('Get a specific user', async () => {
        let uid:string = '8a6e0804-2bd0-4672-b79d-d97027f9071a'
        const req = supertest(server)
        await req
            .get(`/users/${uid}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                console.log(uid, res.body)
            })
        server.close()
    })
    
    test('Insert user', () => {
        const req = supertest(server)
        let uid:string = 'a1be9226-b50f-4e60-833f-e863d39449c2'
        req.post('/users/create').send({
            id: uid,
            username: 'budi',
            name: "Budi Joni",
            email: "budijoni@user.com",
            books: [
                { id: 'B00008', userId: uid, description: 'The Secret World of Stargazing' },
                { id: 'B00001', userId: uid, description: 'The Galaxy' },
            ],
        })
        .expect(200)
        server.close()
    })
})