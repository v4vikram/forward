const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./routes/user.route');

const api_version = process.env.API_VERSION;




app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Register User
// http://localhost:4000/api/v1/users/register
app.use(`${api_version}/users`,  userRoute)

module.exports = app;

