import * as controller from '../controllers/movieController';

export default (app) => {
	app.post('/movie', controller.searchMovie);
	app.get('/browse', controller.browseMusic);
};