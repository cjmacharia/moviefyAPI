export const creationSuccess = (response, data) => {
	response.status(201).json({
		message: 'successfully created',
		data: data});
};

export const registrationError = (res) => {
	res.status(409).json({
		message: 'The email is already taken'
	});
};

export const registrationDefaultError = (res, result) => {
	res.status(401).json({
		error: result
	});
};

export const userNotError = (res) => {
	res.status(401).json({
		error: 'Hey!! the user does not exists'
	});
};

export const NotFoundError = (res) => {
	res.status(404).json({
		error: 'Hey!! the details you are requesting for do not exist'
	});
};

export const loginSuccess = (res, token) => {
	res.status(200).json({
		message: 'Authentication successful', 
		token: token
	});
};

export const AuthenticationError = (res) => {
	res.status(401).json({
		message: 'Authentication failed', 
	});
};

export const serverError = (res, err) => {
	res.status(500).json({
		message: err
	});	
};

export const getResultsSuccess = (res, results) => {
	res.status(200).json({
		data: results
	});
};

export const deleteContentSuccess = (res) => {
	res.status(200).json({
		message: 'details Successfully deleted'
	});
};

export const updateContentSuccess = (res) => {
	res.status(200).json({
		message: 'details Successfully updated'
	});
};