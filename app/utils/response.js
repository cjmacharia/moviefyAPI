export const creationSuccess = (response, data) => {
	response.status(201).json({
		message: 'successfully created',
		data: data});
};

export const validationError = (res, err) => {
	res.status(403).json({
		error: err.message
	});
};

export const UserDetailsError = (res, err) => {
	res.status(403).json({
		error: err
	});
};

export const userNotError = (res) => {
	res.status(401).json({
		error: 'Hey!! the user does not exists'
	});
};

export const NotFoundError = (res) => {
	res.status(404).json({
		error: 'Hey!! Not found'
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
		error: 'Authentication failed' 
	});
};

export const getResultsSuccess = (res, results) => {
	res.status(200).json({
		data: results
	});
};

export const successfullResponse = (res) => {
	res.status(200).json({
		message: 'operation successfull'
	});
};

export const serverError = (res) => {
	res.status(500).json({
		error: 'A server error occured'
	});	
};


export const nothingFound = (res, err) => {
	res.status(404).json({
		error: err
	});	
};

export const NoContent = (res) => {
	res.status(204);
};