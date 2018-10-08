'use strict';
import express from 'express';
import bodyParser from'body-parser';
import morgan from 'morgan';
import mongoose from'mongoose';
import config from'./config/db.config';
import userRoutes from './app/routes/userRoutes';
const app = express();
const servePort = config.development.port;
app.use(morgan('combined'));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'development'){
	mongoose.connect(config.development.db, { useNewUrlParser: true, }).then(() => {
		console.log('successfully connected to the database');
	}).catch((err) =>{
		console.log('an error occured', err);
	});
}

userRoutes(app);
const server = app.listen(servePort, () => {
	console.log('server runing on port ' + servePort);
});

export default  server;