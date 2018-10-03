'use strict';
import express from 'express';
import bodyParser from'body-parser';
import mongoose from'mongoose';
import { url } from'./config/db.config';
const app = express();
app.use(bodyParser.json());

const port = 8000;
mongoose.connect(url, { useNewUrlParser: true, }).then(() => {
	console.log('successfully connected to the database');
}).catch((err) =>{
	console.log('an error occured', err);
});
    
const server = app.listen(port, () => {
	console.log('server runing on' + port);
});
export default  server;