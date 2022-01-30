const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: false
    }]
}, { timestamps: true })

const Post = mongoose.model("Posts", PostsSchema)
module.exports = Post