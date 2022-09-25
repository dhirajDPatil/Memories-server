import dotenv from 'dotenv'; 
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from './routes/posts.js';

dotenv.config();
const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req,res) => {
    res.send('Hello to memories APIS');
})

const host = '0.0.0.0';

const port = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(port, host, ()=> console.log(`Server running on port: ${port}`)))
    .catch((err)=> console.log(err.message));