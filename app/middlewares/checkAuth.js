import { verify } from 'jsonwebtoken';
import  * as responses from '../utils/response';
export default (req, res, next) => {
	try {

		const decoded = verify(req.headers.token, process.env.JWT_KEY);
		req.userData = decoded;
		next();

	} catch(err) {
		responses.AuthenticationError(res, err);
	} 
};