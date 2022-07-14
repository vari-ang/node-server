import saveBook from '../controllers/book'

test('test call saveBook', async () => {
    let book:any = {
        id: 'B000088',
        description: 'The Secret World of Stargazing',
    }
    let res:boolean = await saveBook(book)
    expect(res).toBe(true)
})