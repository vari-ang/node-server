import Email from '../classes/email'
import sendMail from '../controllers/send_email'

test('Send email', async () => {
    let email:Email = new Email(
        null,
        null,
        "user@example.com",
        "Email notification",
        "",
        "<h2>Hello</h2><p>Wish you a great day!</p>"
    )
    console.log('HELLO', email.senderName, email.senderAdress)

    let res = await sendMail(email)
    expect(res).toBe(true)
})