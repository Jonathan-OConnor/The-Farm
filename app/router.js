const orm = require("./db/orm.mongoose")

function router(app, API_URL, STATIC_PATH) {
   app.post('/api/event', async function(req, res){
       const {status, message, eventData} = await orm.createEvent(req.body)
       res.send({status, message, eventData})
       console.log(`event ${eventData.title} created`)
   })
   
   app.get('/api/event', async function(req, res){
       console.log('running')
       const {status, message, eventList} = await orm.getAllEvents()
       res.send({status, message, eventList})
       console.log('sent event list')
   })
}


module.exports = router