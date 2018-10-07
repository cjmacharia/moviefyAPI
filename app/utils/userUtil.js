import  validator from 'validator';
import  bcrypt from 'bcrypt';

export const validate  = (data) => {
	const email = data.email;
	const name = data.name;
	const validEmail = validator.isEmail(email);
	return new Promise((resolve, reject) => {
		if (!validEmail) {
			return reject ('this must be a valid email');
		}
		else if (name) {
			const re = name.match(/^[A-Za-z\s]*$/);
			if (!re) {
				return reject ('the name can not contain a number');
			}
		}
		return resolve(data);
	});
};

export const  hashPassword = (req, res, data) => {
	try {
		const password = data;
		const validPassword = password.trim();
		return new Promise ((resolve, reject) => {
			if (!validPassword){
				return reject ('The password field cannot be empty');
			} else {
				const hashedPassword = bcrypt.hash(data, 10);
				return resolve(hashedPassword);
			}
		});
	
	}catch (err) {
		return err;
	}
};