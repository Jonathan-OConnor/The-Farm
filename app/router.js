const orm = require("./db/orm.mongoose")

function router(app, API_URL, STATIC_PATH, transporter, mailOptions) {
    // calendar api requests
    app.post('/api/event', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const { status, message, eventData } = await orm.createEvent(req.body)
            res.send({ status, message, eventData })
            console.log(`event ${eventData.title} created`)
        } else {
            res.send({ status: false, message: "user not logged in" })
        }

    })

    app.get('/api/event', async function (req, res) {
        const { status, message, eventList } = await orm.getAllEvents()
        res.send({ status, message, eventList })
        console.log('sent event list')

    })
    app.put('/api/event', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const { status, message, eventData } = await orm.updateEvent(req.body)
            res.send({ status, message })
            console.log('updated entry')
        } else {
            res.send({ status: false, message: "user not logged in" })
        }
    })
    app.delete('/api/event', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const { status, message } = await orm.deleteEvent(req.body)
            res.send({ status, message })
            console.log('event deleted')
        } else {
            res.send({ status: false, message: "user not logged in" })
        }
    })

    // emailer api requests
    app.post('/api/emails', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const { status, message, emailData } = await orm.addEmail(req.body)
            res.send({ status, message, emailData })
            console.log(`email: ${emailData.email} saved`)
        } else {
            res.send({ status: false, message: "user not logged in" })
        }
    })
    app.get('/api/emails', async function (req, res) {
        const verification = await orm.weakVerify(req.headers.session)
        if (verification.status) {
            const { status, message, emailList } = await orm.getAllEmails()
            res.send({ status, message, emailList })
            console.log('sent email list')
        } else {
            res.send({ status: false, message: "user not logged in" })
        }

    })
    app.delete('/api/emails', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const { status, message, emailData } = await orm.deleteEmail(req.body)
            res.send({ status, message })
            console.log('deleted email')
        } else {
            res.send({ status: false, message: "user not logged in" })
        }
    })

    app.post('/api/email', async function (req, res) {
        const verification = await orm.verify(req.body)
        if (verification.status) {
            const msg = req.body.msg
            const mailList = req.body.mailList
            const subject = req.body.subject
            mailOptions.text = msg
            mailOptions.to = mailList
            mailOptions.subject = subject
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                    res.status(500).send({ status: false, message: "This is an error" })
                } else {
                    console.log("Email sent successfully");
                    res.send({ status: true, message: "Email sent" });
                }
            });
        } else {
            res.send({ status: false, message: "user not logged in" })
        }
    })
    // login api requests
    app.put('/api/login', async function (req, res) {
        const { status, message, uuid, sessionDate } = await orm.login(req.body)
        res.send({ status: status, message: message, uuid: uuid, sessionDate: sessionDate })
    })

    app.put('/api/verify', async function (req, res) {
        const { status, message } = await orm.verify(req.body)
        res.send({ status: status, message: message })
    })
}


module.exports = router