const orm = require("./db/orm.mongoose")

function router(app, API_URL, STATIC_PATH) {
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
}


module.exports = router