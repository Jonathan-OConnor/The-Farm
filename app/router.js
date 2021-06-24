const orm = require("./db/orm.mongoose")

function router(app, API_URL, STATIC_PATH, transporter, mailOptions) {
   app.post('/api/event', async function(req, res){
       const {status, message, eventData} = await orm.createEvent(req.body)
       res.send({status, message, eventData})
       console.log(`event ${eventData.title} created`)
   })
   
   app.get('/api/event', async function(req, res){
       const {status, message, eventList} = await orm.getAllEvents()
       res.send({status, message, eventList})
       console.log('sent event list')
   })
   app.put('/api/event', async function(req, res){
       const {status, message, eventData} = await orm.updateEvent(req.body)
       res.send({status, message})
       console.log('updated entry')
   })
   app.delete('/api/event', async function(req, res){
       const {status, message} = await orm.deleteEvent(req.body)
       res.send({status, message})
       console.log('event deleted')
   })
   app.post('/api/emails', async function(req, res){
    const {status, message, emailData} = await orm.addEmail(req.body)
    res.send({status, message, emailData})
    console.log(`email: ${emailData.email} saved`)
   })
   app.get('/api/emails', async function(req, res){
    const {status, message, emailList} = await orm.getAllEmails()
    res.send({status, message, emailList})
    console.log('sent email list')
   })
   app.delete('/api/emails', async function(req, res){
       const {status, message, emailData} = await orm.deleteEmail(req.body)
       res.send({status, message})
       console.log('deleted email')
   })

   app.post('/api/email', async function (req, res) {
    const msg = req.body.msg
    const mailList = req.body.mailList
    const subject = req.body.subject
    mailOptions.text = msg
    mailOptions.to = mailList
    mailOptions.subject = subject
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
            res.status(500).send({message:"This is an error"})
        } else {
            console.log("Email sent successfully");
            res.send({message: "Email sent"});
        }
    });
    res.send({message: "Email Sent"})
  
})
}


module.exports = router