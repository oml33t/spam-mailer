/* eslint-disable promise/param-names */
require('dotenv').config()

const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
const txtgen = require('txtgen')

const email = process.argv[2]

let i = 0

async function sendMail (email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL_ID,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.GMAIL_EMAIL_ID,
    to: email,
    subject: txtgen.sentence(),
    text: txtgen.article()
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error)
    } else {
      console.log(`[$${dayjs().toString()}] [${++i}] Email sent: ${info.response}`)
    }
  })
}

const sleep = ms => new Promise(res => setTimeout(res, ms))

async function start () {
  while (true) {
    await sendMail(email)
    await sleep(5000)
  }
}

start()
