import  validator from 'validator';
import  bcrypt from 'bcrypt';

export const validate  = (data) => {
	const email = data.email;
	const name = data.name;
	let sentEmail = email.replace(/\s/g, '');
	const validEmail = validator.isEmail(sentEmail);
	let validName = name.replace(/\s/g, '');
	if (!sentEmail) {
		return 'The email field can not be empty';
	}
	if (!validEmail) {
		return 'this must be a valid email';
	}
	else if (!validName) {
		return 'the name field can not be empty';
	}
	else if (validName) {
		const re = name.match(/^[A-Za-z\s]*$/);
		if (!re) {
			return 'the name can not contain a number';
		}
		return data;
	}
	return data;
};

export const  hashPassword = (req, res, data) => {
	try {
		const hashedPassword = bcrypt.hash(data, 10);
		return hashedPassword;
	}
	catch (err) {
		return err;
	}
};