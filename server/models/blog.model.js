const mongoose = require('mongoose');
const slugify = require('slugify'); 

const BlogSchema = new mongoose.Schema({
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
    largeImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        default: "Admin"
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
}, { timestamps: true })

BlogSchema.pre('save', function (next) {
    if (this.isModified('title')) { 
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
        });
    }
    next();
});

const Blog = mongoose.model('Blog', BlogSchema)
module.exports = Blog;