import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import mongoose from 'mongoose';
import  User  from '../models/userModel';
import * as util  from '../utils/userUtil';
import  * as responses from '../utils/response';
import 'babel-polyfill';

class UserController { 
	static async signUp (req, res) {
		try {

			const hashedPass = await util.hashPassword(req, res, req.body.password);
			const userSignUp = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				password: hashedPass
			});
			let result = await  util.validate(userSignUp);
			result.save((err, result) => {
				if (err) {
					err.name === 'ValidationError' ? responses.validationError(res, err) : responses.UserDetailsError(res, err);
				} else {
					responses.creationSuccess(res, result);
				}
			});

		}	catch(err) {
			responses.UserDetailsError(res, err);
		}
	}	
	
	static async Userlogin (req, res) {
		try {

			let data = {
				email: req.body.email,
				password: req.body.password,
			};
			await util.validate(data);
			let  user = await User.findOne({email: req.body.email});
			if (user === null) {
				responses.userNotError(res);
			} else {
				const match = await bcrypt.compare(data.password, user.password);
				if (match) {
					const token = jwt.sign({ 
						email: user.email,
						userId: user.id
					}, process.env.JWT_KEY, {
						expiresIn: '1hr'
					});
					responses.loginSuccess(res, token);
				} else {
					responses.AuthenticationError(res);
				}
			}

		} catch(err) {
			responses.UserDetailsError(res, err);
		}		
	}
}

export default UserController;
