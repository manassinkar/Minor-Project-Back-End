var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var policy = new Schema({
    index: { type: Number, required: true,unique: true },
    policyName: { type: String, required: true },
    companyName: { type: String, required: true },
    coverInL: { type: Number, required: true },
    cashlessHospitals: { type: Number, required: true },
    premiumMonthly: { type: Number, required: true },
    premiumYearly: { type: Number, required: true }
});

var Policy = mongoose.model('Policy', policy);
module.exports = Policy;