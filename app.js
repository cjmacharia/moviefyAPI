'use strict';
import express from 'express';
import bodyParser from'body-parser';
import morgan from 'morgan';
import mongoose from'mongoose';
import cors from 'cors';
import config from'./config/db.config';
import userRoutes from './app/routes/userRoutes';
import musicRoutes from './app/routes/musicRoutes';

const serverPort = config.development.port;
const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
musicRoutes(app);
userRoutes(app);

if (process.env.NODE_ENV === 'development') {
	mongoose.connect(config.development.db, { useNewUrlParser: true, })
		.then(() => {
			console.log('successfully connected to the database');
		}).catch((err) => {
			console.log('an error occured', err);
		});
} else {
	mongoose.connect(config.development.db, { useNewUrlParser: true, })
		.then(() => {
			console.log('successfully connected to the database');
		}).catch((err) => {
			console.log('an error occured', err);
		});
}

const server = app.listen(process.env.PORT || serverPort, () => {
	console.log('server runing on port ' + serverPort);
});

export default server;
