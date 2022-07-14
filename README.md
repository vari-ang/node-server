## Node Server
You can clone this repo as a template to generate a RESTful API web server in Node.js with TypeScript that connects to a database.

## Features
- Database manipulation using [Sequelize](https://sequelize.org) as a modern ORM library
- Sending email using [Nodemailer](https://nodemailer.com/)
- Unit testing using [Jest](https://jestjs.io)

## Perequisites
- Having Node.js installed in your machine
- Updating the DB config at db.ts file inside the src folder

## How To Run The Project

Here are some steps to run this project successfully. Please refer to note section below to make sure you have everything installed on your computer before running these steps.

1. Install npm dependencies  
`npm i`

2. Configure the DB credentials in db.ts file at the root folder

3. Start the server  
`npm start`  
The server will listen for line changes in index.ts, autocompiled it into js files then autorun the js files.

### Testing

Run `yarn jest` to run all javascript unit tests using Jest framework

To get the test coverage summary, run `yarn jest --coverage`. The report will be output to the console and the html is generated at coverage/lcov-report/index.html

If you want to run a particular unit test, run `yarn jest [ filename without .js ]`. For example: `yarn jest send_email`


### Note
Be sure to have installed `yarn`, `typescript` and `jest` in your machine.
To install:
- `npm install -g yarn`
- `npm i -g typescript`
- `yarn add --dev jest`

Happy Coding!