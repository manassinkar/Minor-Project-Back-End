var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true,trim: true },
    contact: { type: Number, required: true },
    age: { type: Number, required: true },
    annualIncome: { type: Number, required: true },
    password: { type: String, required: true,trim: true },
    admin: { type: Boolean, required: true }
});

var User = mongoose.model('User', user);
module.exports = User;