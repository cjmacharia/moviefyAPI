import fetch from 'node-fetch';
import * as responses from '../utils/response';
let allArtsits = [];
let latestMovies = [];
let searchedMovies = [];

export  const  searchMovie = async (req, res) => {
	return new Promise (async(resolve, reject) => {
		try{ 
			let search = req.body.movie;
			const movieUrl = `http://www.api.what-song.com/search/?type=movie&field=${search}`;
			const response = await fetch(movieUrl);
			const result = await response.json();
			let foundMovies = await result.data[0].data;
			if(foundMovies.length === 0){
				return reject ('No movie found', foundMovies.length);
			} else {
				foundMovies.forEach((movie) =>{
					searchedMovies.push({_id:movie._id, title: movie.title });
					return resolve (searchedMovies);
				});
			} 
		} catch(err) {
			responses.serverError(res, err);
		}	
	});
};

export const fetchedMovies = async(req, res) => {
	try{ 
		let details = await searchMovie(req, res);
		responses.getResultsSuccess(res, details);
	} catch (err) {
		responses.nothingFound(res, err);
	}
};

export const getTracks = async(req, res) => {
	try{ 	
		let id = req.params.id;
		let soundtrackUrl = `http://www.api.what-song.com/movie-info/?movieID=${id}`;
		const fetchTracks = await fetch(soundtrackUrl);
		const foundTracks = await fetchTracks.json();
		const listOfFoundTracks = await foundTracks.data.CompleteListOfSongs;
		listOfFoundTracks.forEach((track) => {
			allArtsits.push({name: track.artist.name, album: track.album, song: track.title, spotify: track.spotify, albumId: track.spotifyAlbumId});
		});
		responses.getResultsSuccess(res , allArtsits);
	} catch(err) {
		responses.NotFoundError(res, err);
	}
};

export const browseMusic = async (req, res) => {
	try { 
		const browseUrl = 'http://www.api.what-song.com/recent-movies/?limit=5';
		const recentMovies = await fetch(browseUrl);
		const foundMovies = await recentMovies.json();
		const listOfFoundMovies = foundMovies.data;
		listOfFoundMovies.forEach((movie) => {
			latestMovies.push({_id: movie._id, name: movie.title, poster: movie.poster, release_date: movie.time_released, year: movie.year});
		});
		responses.getResultsSuccess(res, latestMovies);
	} catch(err) {
		responses.serverError(res, err);
	}
};
