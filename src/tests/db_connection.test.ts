import db from '../db'

test('Test database connection', async () => {
    let res:boolean
    res = await db.testConnection()
    expect(res).toBe(true)
})