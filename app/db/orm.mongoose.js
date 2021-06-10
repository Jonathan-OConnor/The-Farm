const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID

const db = require('./models')

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

async function createEvent(eventData) {
    const saveData = {
        date: eventData.date,
        title: eventData.title,
        description: eventData.description || '',
        yearly: eventData.yearly || false
    }
    const savedEvent = await db.events.create(saveData)
    if (!savedEvent._id) {
        return { status: false, message: "failed to create event entry" }
    }
    return {
        status: true,
        message: "Event successfully registered",
        eventData: {
            id: savedEvent._id,
            date: savedEvent.date,
            title: savedEvent.title,
            description: savedEvent.description,
            yearly: savedEvent.yearly,
         
        }
    }
}

async function getAllEvents() {
    const events = await db.events.find()
    return {
        status: true,
        message: "Successfully retrieved events",
        eventList: events
    }
}

module.exports = {
    createEvent,
    getAllEvents,
}