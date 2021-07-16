const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema(
    {

        username: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            trim: true
        },
        uuid: {
            type: String,
            trim: true
        }
    }
)

module.exports = mongoose.model('users', users)