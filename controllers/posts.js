import mongoose from 'mongoose';
import PostMessage from '../models/postMassage.js'

export const getPosts = async (req, res)=> {
    try {
        const postMassages = await PostMessage.find()
        console.log(postMassages)
        res.status(201).json(postMassages);
    } catch(error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res)=> {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(401).send("Error in connection");   
    }
}

// req url will be /posts/1234

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true})
    res.status(201).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Wrong post id");
    await PostMessage.findByIdAndRemove(id);
    res.status(201).json("Post deleted successfully");
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id");

    const post  =  await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true })
    res.status(201).json(updatedPost);
}