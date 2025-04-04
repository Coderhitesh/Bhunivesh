const mongoose = require('mongoose');

const propertyInquerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('PropertyInquery', propertyInquerySchema);