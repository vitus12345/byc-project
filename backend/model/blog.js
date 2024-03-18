const mongoose = require("mongoose");
const Joi = require("joi");

const blogSchema = new mongoose.Schema({

    image: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    author: {
        type: String,
        required: true
    },

    body: {
        type: String,
        minlength: 20,
        maxlength: 10000,
        required: true
    },

    views: {
        type: Number,
        min: 0,
        default: 0
    },
    likes: {
        type: Number,
        min: 0,
        default: 0
    },

    dateAdded: {
        type: Date,
        default: Date.now
    }
})


const Blog = mongoose.model('Blog', blogSchema);

function validateBlog(blog){
    const schema ={
       image: Joi.array().required(),
       title: Joi.string().min(5).max(50).required(),
       author: Joi.string().required(),
       body: Joi.string().min(20).max(10000).required(),
      
    };
    return Joi.validate(blog, schema)
};


exports.Blog = Blog
exports.validate = validateBlog