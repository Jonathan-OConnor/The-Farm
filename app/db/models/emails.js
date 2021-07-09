const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emails = new Schema(
    {
        dateAdded: {
            type: Date,
            default: Date.now
        },
        email: {
            type: String,
            trim: true
        },
        group: {
            type: String,
            trim: true
        }
    }
)
module.exports = mongoose.model('emails', emails)