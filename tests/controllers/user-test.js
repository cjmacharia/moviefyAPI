process.env.NODE_ENV='TEST';
process.env.JWT_KEY='SECRTET';
import chai from 'chai';
import chaiHttp from 'chai-http';
import * as util from '../../app/utils/userUtil';
import Model from '../../app/models/userModel';
import config from'../../config/db.config';
import mongoose from 'mongoose';
import server from '../../app';
import { request } from 'https';
chai.use(chaiHttp);
const should = chai.should();
	
describe ('test user sign up functionalities', () => {
	before((done) => {
		Model.collection.drop();
		mongoose.connect(config.test.db, { useNewUrlParser: true}).then(() => {
			console.log('successfully connected to db test');
		}).catch((err) => {
			console.log('failed', err);
		});
		const user = new Model({
			name: 'cjmash',
			email: 'cj@email.com',
			password: 'cjmash'
		});
		util.validate(user);
		done();
	});

	after((done) => {
		mongoose.connection.close();
		done();
		process.exit();
	});

	it ('should create a new user and return status code 201', (done) => {
		const user = new Model({
			name: 'cjmash',
			email: 'cjmash@email.com',
			password: 'cjmash'
		});
		chai.request(server)
			.post('/signup')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.data.should.have.property('_id');
				res.body.data.should.have.property('name');
				res.body.data.should.have.property('email');
				res.body.data.should.have.property('password');
				res.body.message.should.be.eql('successfully created');
				done();			
			});
	});

	it ('should fail to create a new user if the email field is empty', (done) => {
		const user = new Model({
			name: 'cjmash',
			email: '',
			password: 'cjmash'
		});
		chai.request(server)
			.post('/signup')
			.send(user)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.should.be.a('object');
				res.body.error.should.be.eql('The email field can not be empty');
				done();			
			});
	});

	it ('should fail to create a new user if the user name field is empty', (done) => {
		const user = new Model({
			name: '',
			email: 'cjmash@email.com',
			password: 'cjmash'
		});
		chai.request(server)
			.post('/signup')
			.send(user)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.should.be.a('object');
				res.body.error.should.be.eql('the name field can not be empty');
				done();			
			});
	});

	it ('should login a user and return status code 200', (done) => {
		const user = {
			email: 'cjmash@email.com',
			password: 'cjmash'
		};
		chai.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.message.should.be.eql('Authentication successful');
				res.body.should.have.property('token');
				done();	
			});
	});

	it ('should fail to login a user if the email is not registered', (done) => {
		const user = {
			email: 'testuser@email.com',
			password: 'cjmash'
		};
		chai.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(401);
				res.body.error.should.be.eql('Hey!! the user does not exists');
				done();	
			});
	});
	
	it ('should fail to login a user if the password is wrong', (done) => {
		const user = {
			email: 'cjmash@email.com',
			password: 'thisiswrong'
		};
		chai.request(server)
			.post('/login')
			.send(user)
			.end((err, res) => {
				res.should.have.status(401);
				done();	
			});
	});
});