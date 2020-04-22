const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true, minlength: 6},
});

userSchema.index({
    email: 1,
    password: 1,
  }, {
    unique: true,
  });

module.exports = mongoose.model('User', userSchema)