'use strict';
import express from 'express';
import bodyParser from'body-parser';
import morgan from 'morgan';
import mongoose from'mongoose';
import config from'./config/db.config';
import userRoutes from './app/routes/userRoutes';
import musicRoutes from './app/routes/musicRoutes';

const servePort = config.development.port;
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
musicRoutes(app);
userRoutes(app);

if (process.env.NODE_ENV === 'development'){
	mongoose.connect(config.development.db, { useNewUrlParser: true, }).then(() => {
		console.log('successfully connected to the database');
	}).catch((err) =>{
		console.log('an error occured', err);
	});
}

const server = app.listen(servePort, () => {
	console.log('server runing on port ' + servePort);
});

export default  server;