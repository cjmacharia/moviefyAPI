import * as controller from '../controllers/movieController';

export default (app) => {

	app.post('/movie', controller.fetchedMovies);

	app.get('/browse', controller.browseMusic);

	app.get('/movie/:id', controller.getTracks);
	
};