import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

// dhirajpatil
// dhirajpatil123
const app = express();

dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req,res)=> {
    res.send('Hello to memories APIS')
})

// const CONNECTION_URL = 'mongodb+srv://dhirajpatil:dhirajpatil123@cluster0.2v4mycb.mongodb.net/memory?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err.massage));
// mongoose.set('useFindAndModify', false);