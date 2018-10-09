import  UserController  from '../controllers/userController';

export default (app) => {

	app.post('/signup', UserController.signUp);

	app.post('/login', UserController.Userlogin);

};