import fetch from 'node-fetch';
import * as responses from '../utils/response';
import Favorite from '../models/favoriteModel';
const apiUrl = 'http://www.api.what-song.com/';

const myHeader = {
	'Content-Type': 'application/json',
	'Authorization': '1yJQUEjLRGrNKOaqTMA1gXCIh3qaZSetEnnGXW0Ydz1bGpme',
	'Accept-Encoding' : 'gzip, deflate'
};

export  const  searchMovie = async (req, res) => {
	return new Promise (async(resolve, reject) => {
		try {
			let search = req.body.movie;
			const movieUrl = `${apiUrl}search/?type=movie&field=${search}`;
			const response = await fetch(movieUrl);
			const result = await response.json();
			let foundMovies = await result.data[0].data;
			if (foundMovies.length === 0) {
				return reject ('No movie found');
			} else {
				return resolve (foundMovies);
			} 

		} catch(err) {
			responses.serverError(res, err);
		}	
	});
};

export const fetchedMovies = async(req, res) => {
	try {

		let details = await searchMovie(req, res);
		responses.getResultsSuccess(res, details);

	} catch(err) {
		responses.nothingFound(res, err);
	}
};

export const getRatings = async(req, res, imdbId) => {
	return new Promise(async (resolve, reject) => {
		if(!imdbId) {
			return reject ('this Id must be provided');
		}
		const url = `http://www.omdbapi.com/?apikey=48bd94&t=${imdbId}`;
		const imdbDetails = await fetch(url);
		const fetchedDetails = await imdbDetails;
		const foundRatings = await fetchedDetails.json();
		return resolve(foundRatings.imdbRating);
	});

};

export const getTracks = async(req, res) => {
	try {

		let id = req.params.id;
		let soundtrackUrl = `${apiUrl}movie-info/?movieID=${id}`;
		const fetchTracks = await fetch(soundtrackUrl);
		const foundTracks = await fetchTracks.json();
		const imdbId = foundTracks.data.movie.title;
		const ratings = await getRatings(req, res, imdbId);
		let allArtsits = [];
		const listOfFoundTracks = await foundTracks.data.CompleteListOfSongs;
		if (listOfFoundTracks.length === 0) {
			responses.NotFoundError(res);
		} else { 
			
			listOfFoundTracks.forEach((track) => {

				allArtsits.push({
					id: track._id,
					name: track.artist.name, 
					album: track.album, 
					song: track.title, 
					spotify: track.spotify, 
					albumId: track.spotifyAlbumId,
					imdbratings: ratings
				});
			});
		}
		responses.getResultsSuccess(res, allArtsits);

	} catch(err) {
		responses.NotFoundError(res, err);
	}
};

export const browseMusic = async (req, res) => {
	try {

		const browseUrl = `${apiUrl}recent-movies/?limit=5`;
		const recentMovies = await fetch(browseUrl);
		const foundMovies = await recentMovies.json();
		const latestMovies = [];
		const listOfFoundMovies = foundMovies.data;
		listOfFoundMovies.forEach((movie) => {
			latestMovies.push({
				_id: movie._id, 
				name: movie.title, 
				poster: movie.poster, 
				release_date: 
				movie.time_released, 
				year: movie.year
			});
		});
		responses.getResultsSuccess(res, listOfFoundMovies);

	} catch(err) {
		responses.serverError(res, err);
	}
};

export  const favouriteTrack = async (req, res) => {
	try {

		const sId = req.params.sId;
		const trackUrl = `${apiUrl}add-favorite-song?songID=${sId}`;
		const favoriteTrack = await fetch(trackUrl,{ 
			headers: myHeader
		});
		const foundFavoriteTrack = await favoriteTrack.json();
		console.log(foundFavoriteTrack);
		const data = new Favorite({
			_id: new mongoose.Types.ObjectId(),
			songid: foundFavoriteTrack.data.song,
			moviesong: foundFavoriteTrack.data.movie,
			owner: req.userData.userId,
		});
		data.save((err, result) => {
			if (err) {
				err.name === 'ValidationError' ? responses.validationError(res, err) : responses.UserDetailsError(res, err);
			} else {
				responses.creationSuccess(res, result);
			}
		});

	} catch(err) {
		responses.serverError(res);
	}
};
