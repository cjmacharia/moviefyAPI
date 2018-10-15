import * as MovieController from '../controllers/movieController';
import checkAuth from '../middlewares/checkAuth';
import * as favoriteController from '../controllers/favoriteSongController';
export default (app) => {

	app.post('/movie', MovieController.fetchedMovies);

	app.get('/browse', MovieController.browseMusic);

	app.get('/movie/:id', MovieController.getTracks);

	app.get('/favorite/:sId', checkAuth, favoriteController.favouriteTrack);

	app.get('/unfavorite/:sId', checkAuth, favoriteController.unFavouriteTrack);

	app.get('/favorites/', checkAuth, favoriteController.displayMyFavourites);
	
};