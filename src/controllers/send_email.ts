import Email from '../classes/email'
import nodemailer, { Transporter } from 'nodemailer'

const transporter:Transporter = nodemailer.createTransport({
    host: '[ SMTP HOST ]',
    port: 4500,
    // secure: false, // TLS requires secureConnection to be false
    auth: {
      user: '[ USER ]',
      pass: '[ PASSWORD ]',
    },
    // tls: { // Use if necessary
    //     minVersion: 'TLSv1',
    //     ciphers:'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH',
    //     rejectUnauthorized: false
    // },
})

export default async function sendMail(email:Email):Promise<boolean> {
    try {
        if(!email.senderName) email.senderName = 'user'
        if(!email.senderAdress) email.senderAdress = 'user@example.com'
        if(!email.recipientAddress) return false
        await transporter.sendMail({
            from: `${email.senderName} <${email.senderAdress}>`, // sender address
            to: email.recipientAddress, // list of receivers (separated by comma)
            subject: email.subject, // Subject line
            text: email.text, // plain text body
            html: email.html, // html body
        }, (err, info) => {
            if(err) {
                console.error("Mail server error", err)
            } else {
                console.log('Mail sent to', email.recipientAddress, info)
            }
            transporter.close()
            return true
        })
        transporter.close()
        return true
    } catch(err) {
        console.error(err)
        transporter.close()
        return false
    }
}