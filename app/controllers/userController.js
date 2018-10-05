import bcrypt from 'bcrypt';
import jwt from'jsonwebtoken';
import mongoose from 'mongoose';
import  User  from '../models/userModel';
import * as util  from '../utils/userUtil';
import  * as responses from '../utils/response';
import 'babel-polyfill';

class UserController { 
	static async signUp (req, res) {
		const hashedPass = await util.hashPassword(req, res, req.body.password);
		const userSignUp = new User({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPass
		});

		const result = util.validate(userSignUp);
		if (result === userSignUp) { 
			try { 
				let data = await userSignUp.save();
				responses.creationSuccess(res, data);
			} catch(err) {
				responses.registrationError(res);
			}
		}	
		else {
			responses.registrationDefaultError(res, result);
		}
	}

	static async Userlogin (req, res) {
		try { 
			let  user = await User.findOne({email: req.body.email});
			if(user === null) {
				responses.userNotError(res);
			} else { 
				try { 
					const match = await bcrypt.compare(req.body.password, user.password);
					if (match) {
						const token = jwt.sign({ email: user.email,
							userId: user.id
						}, process.env.JWT_KEY, {
							expiresIn: '1hr'
						});
						responses.loginSuccess(res, token);
					} else {
						responses.AuthenticationError(res)
					}
				} catch(err) {
					responses.AuthenticationError(res);
				}
			}
		} catch(err) {
			responses.serverError(res, err);
		}
	}
}

export default UserController;