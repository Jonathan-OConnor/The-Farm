require('dotenv').config()
const express = require('express')
const apiRouter = require('./app/router')
const path = require('path')
const app = express()
const nodemailer= require('nodemailer')

const PORT = process.env.PORT || 8080
const API_URL = process.env.NODE_ENV === 'production' ?
  '?' : `http://localhost:${PORT}`

// production uses REACT production-build content
const STATIC_PATH = process.env.NODE_ENV === 'production' ?
  path.join('client', 'build') : path.join('client', 'public')

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// static paths (ex. assets, js, images, etc) served automatically from:
app.use(express.static(STATIC_PATH))


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.MAIL_USERNAME,
  to: [],
  subject: '',
  text: ''
};

apiRouter(app, API_URL, STATIC_PATH, transporter, mailOptions)

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, './client/build/index.html'))
  })
}

app.listen(PORT, function () {
  console.log(`Serving app on: ${API_URL} (port: ${PORT})`)
})