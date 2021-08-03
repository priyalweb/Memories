import mongoose from 'mongoose';

//creating mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

//model in which we'll be able to do crud operations
var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;