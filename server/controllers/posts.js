import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req,res) => {
    // res.send('THIS WORKS!');
    try{
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).kson({message: error.message});
    }
}


export const createPost = async (req, res) => {
    // res.send('Post Creation');
    const post = req.body;
    const newPost = new PostMessage(post);
    //     const { title, message, selectedFile, creator, tags } = req.body;
    //     const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try{
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No posts with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id');

    await PostMessage.findByIdAndRemove(id);

    console.log("DELETE!");

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No posts with that id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, {new: true})

    res.json(updatedPost);
}

export default router;

