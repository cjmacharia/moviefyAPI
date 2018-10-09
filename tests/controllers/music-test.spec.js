process.env.NODE_ENV='test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import * as util from '../../app/utils/userUtil';
import config from'../../config/db.config';
import mongoose from 'mongoose';
import server from '../../app';
import { request } from 'https';
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe ('Test movies functionalities', () => {
	
	it('return a list of movies found', (done) => {
		const movie = {
			movie: 'fast and furious'
		};
		chai.request(server)
			.post('/movie')
			.send(movie)
			.end((err, res) =>{
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			});
	});

	 it('returns a not available message incase no movie is returned', (done) => {
		const movie = {
			movie: '40404'
		};
		chai.request(server)
			.post('/movie')
			.send(movie)
			.end((err, res) =>{
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.error.should.be.eql('No movie found');
				done();
			});
	});

	it('returns all sound tracks available for the requested movie', (done) => {
		const id = {
			_id: 102697
		};
		chai.request(server)
			.get(`/movie/${id._id}`)
			.end((err, res) =>{
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			});
	});

	it('return  a 404 error if the ID does not exist', (done) => {
		const id = {
			_id: '000'
		};
		chai.request(server)
			.get(`/movie/${id._id}`)
			.end((err, res) =>{
				res.should.have.status(404);
				res.body.should.be.a('object');
				res.body.error.should.be.eql('Hey!! Not found');
				done();
			});
	});

	it('return a list of movies found', (done) => {
		chai.request(server)
			.get('/browse')
			.end((err, res) =>{
				res.should.have.status(200);
				res.body.should.be.a('object');
				done();
			});
	});

});