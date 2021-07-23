const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID

const db = require('./models')
const salt = bcrypt.genSaltSync(13)


mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// calendar functions    
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
    } else {
        return {
            status: true,
            message: "Event successfully registered",
            eventData: {
                _id: savedEvent._id,
                date: savedEvent.date,
                title: savedEvent.title,
                description: savedEvent.description,
                yearly: savedEvent.yearly,

            }
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

async function updateEvent(eventData) {
    const saveData = {
        date: eventData.date,
        title: eventData.title,
        description: eventData.description || '',
        yearly: eventData.yearly || false
    }
    const updatedEvent = await db.events.updateOne({ "_id": ObjectId(eventData._id) }, { $set: { "date": saveData.date, "title": saveData.title, "description": saveData.description, "yearly": saveData.yearly } })
    if (updatedEvent.matchedCount === 1) {
        return {
            status: true,
            message: "Event successfully updated",
        }
    }
    else {
        return {
            status: false,
            message: "Event was not updated",
        }
    }
}

async function deleteEvent(eventData) {
    const deleted = await db.events.deleteOne({ "_id": ObjectId(eventData._id) })
    if (deleted.deletedCount == 1) {
        return {
            status: true,
            message: "Event was deleted successfully",
        }
    } else {
        return {
            status: false,
            message: "there was a problem",
        }
    }
}

// emailer functions
async function addEmail(emailObject) {
    const saveData = {
        email: emailObject.email,
        group: emailObject.group
    }
    const savedEmail = await db.emails.create(saveData)
    if (!savedEmail._id) {
        return { status: false, message: "failed to create email entry" }
    }
    return {
        status: true,
        message: "Email successfully saved",
        emailData: {
            _id: savedEmail._id,
            email: savedEmail.email,
            dateAdded: savedEmail.dateAdded
        }
    }
}
async function getAllEmails() {
    const emails = await db.emails.find()
    return {
        status: true,
        message: "Successfully retrieved events",
        emailList: emails
    }
}

async function deleteEmail(emailObject) {
    const email = emailObject.email
    const response = await db.emails.deleteOne({ email: email })
    return {
        status: true,
        message: "Successfully retrieved events",
        emailData: email
    }
}

// login functions
async function login(loginInfo) {
    const findUser = await db.users.findOne({ username: loginInfo.username })
    if (findUser) {
        if (bcrypt.compareSync(loginInfo.password, findUser.password)) {
            return { status: true, message: "login successful", uuid: findUser.uuid }
        } else {
            console.log('rejected password')
            return { status: false, message: "make sure username and password are correct" }
        }
    } else {
        console.log('rejected username')
        return { status: false, message: "make sure username and password are correct" }
    }
}

async function verify(uuid){
    const findUser = await db.users.findOne({uuid: uuid})
    if (findUser){
        return 
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    addEmail,
    getAllEmails,
    deleteEmail,
    login,
    verify
}