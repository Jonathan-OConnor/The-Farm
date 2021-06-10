const mongoose = require('mongoose')
const Schema = mongoose.Schema

const events = new Schema(
    {
        date: {
            type: String,
            trim: true
        },
        title:{
            type: String,
            trim: true
        },
        description:{
            type: String,
            trim: true
        },
        yearly:{
            type: Boolean,
            default: false
        }
    }
)

module.exports = mongoose.model('events', events)