export default class Email {
    constructor(
        public senderName:string | null = 'No Reply',
        public senderAdress:string | null = 'user@example.com',
        public recipientAddress:string, // list of receivers (separated by comma)
        public subject:string, // Subject line
        public text:string, // plain text body
        public html:string, // html body
    ){}
}