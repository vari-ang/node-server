import { Op } from 'sequelize'
import { Book } from '../models/book'

describe('Test book query', () => {
    test('Test get all books', async () => {
        try {
            const books = await Book.findAll()
            console.log("All books:", JSON.stringify(books))
            expect(true).toBe(true)
        } catch(e) {
            console.error(e)
            expect(true).toBe(false)
        }
    })

    test('Test get some books', async () => {
        try {
            const books = await Book.findAll({ where: { 
                id: {
                    [Op.in]: ['B00004', 'B00005']
                }
            } })
            console.log("All books:", JSON.stringify(books))
            expect(true).toBe(true)
        } catch(e) {
            console.error(e)
            expect(true).toBe(false)
        }
    })

    test('Insert book', async () => {
        try {
            const book:Book = await Book.create({ id: 'B00001', description: 'The Art of Programming' })
            console.log('Book auto generate ID', book.get('id'))
            expect(true).toBe(true)
        } catch(e) {
            console.error(e)
            expect(true).toBe(false)
        }
    })

    test('Update book', async () => {
        try {
            await Book.update({ name: 'The Galaxy' }, {
                where: {
                    id: 'B00001'
                }
            })
            expect(true).toBe(true)
        } catch(e) {
            console.error(e)
            expect(true).toBe(false)
        }
    })

    test('Delete book', async () => {
        try {
            await Book.destroy({
                where: {
                    id: 'B00001'
                }
            })
            expect(true).toBe(true)
        } catch(e) {
            console.error(e)
            expect(true).toBe(false)
        }
    })
})

