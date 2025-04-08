const mongoose = require('mongoose');

const CompanyImageSchema = new mongoose.Schema({
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('CompanyImage', CompanyImageSchema);