import  validator from 'validator';
import  bcrypt from 'bcrypt';

export const validate  = (data) => {
	const email = data.email;
	const name = data.name;
	return new Promise((resolve, reject) => {
		if(!email){
			return reject ('The email field is required');
		}
		if (email) {
			const validEmail = validator.isEmail(email);
			if(!validEmail){
				return reject ('this must be a valid email');
			}
		}
		if (name) {
			const re = /^([a-z]+\s)*[a-z]+$/;
			const validName = name.match(re);
			if (!validName) {
				return reject ('the name can not contain a number');
			}
		}
		return resolve(data);
	});
};

export const  hashPassword = (req, res, data) => {
	try {
		return new Promise ((resolve, reject) => {
			if(!data){
				return reject ('All fields are required');
			} else {
				const validPassword = data.trim();
				if (!validPassword){
					return reject ('The password field cannot be empty');
				}else {
					const hashedPassword = bcrypt.hash(data, 10);
					return resolve(hashedPassword);
				}
			}
		});
	}catch (err) {
		return err;
	}
};
