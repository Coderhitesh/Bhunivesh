const mongoose = require('mongoose');
const slugify = require('slugify'); 

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    completeAddress: {
        type: String,
        required: true
    },
    startingPrice: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    propertyType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PropertyType',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    MetaTitle: {
        type: String,
        required: true
    },
    MetaDescription: {
        type: String,
        required: true
    },
    MetaKeywords: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

propertySchema.pre('save', function (next) {
    if (this.isModified('name')) { 
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
        });
    }
    next();
});


module.exports = mongoose.model('Property', propertySchema);