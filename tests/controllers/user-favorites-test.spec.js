process.env.NODE_ENV='test';
process.env.JWT_KEY='SECRTET';

import chai from 'chai';
import chaiHttp from 'chai-http';
import config from'../../config/db.config';
import mongoose from 'mongoose';
import server from '../../app';
import { request } from 'https';
chai.use(chaiHttp);

const should = chai.should();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YmJmMTZhY2U3YzdjMTc5MThhYzBhNGMiLCJpYXQiOjE1Mzk0NTY1NzcsImV4cCI6MTU0ODA5NjU3N30.AEz7_SBCsHgl2osYy8wF0IVU5-2hpr34fRmUEV9wlrk';

describe ('test favorites functionalities', () => {

	before((done) => {
		mongoose.connect(config.test.db, { useNewUrlParser: true}).then(() => {
			console.log('successfully connected to db test');
		}).catch((err) => {
			console.log('failed', err);
		});
		done();
	});

	after((done) => {
		mongoose.connection.close();
		done();
	});
	
	it('Should show all favourites', (done) => {	
		chai.request(server)
			.get('/favorites')
			.set('token', token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			});

	});

	it('Should fail to authorize if token is not provided', (done) => {	
		let data = {
			sId: 204686
		};
		chai.request(server)
			.get(`/favorite/${data.sId}`)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.should.be.a('object');
				done();
			}
			);
	});

	it('Should fail to favorite  if an error occured', (done) => {	
		
		chai.request(server)
			.get('/favorite/00')
			.set('token', token)
			.end((err, res) => {
				res.should.have.status(403);
				res.body.should.be.a('object');
				done();
			}
			);
	});

	it('Should unfavourite a track', (done) => {	
		let data = {
			sId: 204686
		};
		chai.request(server)
			.get(`/unfavorite/${data.sId}`)
			.set('token', token)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			}
			);
	});

	it('Should favourite a track', (done) => {	
		let data = {
			sId: 204686
		};
		chai.request(server)
			.get(`/favorite/${data.sId}`)
			.set('token', token)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				done();
			}
			);
	});

});
