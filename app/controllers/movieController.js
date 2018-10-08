import fetch from 'node-fetch';
let allArtsits = [];
let allMovies = [];
export  const  searchMovie = async (req, res) => {
	let search = req.body.movie;
	const movieUrl = `http://www.api.what-song.com/search/?type=movie&field=${search}`;
	try {
		const response = await fetch(movieUrl);
		const result = await response.json();
		let foundMovie = await result.data[0].data[0];
		const foundMovieId = foundMovie._id;
		const soundtrackUrl = `http://www.api.what-song.com/movie-info/?movieID=${foundMovieId}`;
		const fetchTracks = await fetch(soundtrackUrl);
		const foundTracks = await fetchTracks.json();
		const listOfFoundTracks = foundTracks.data.CompleteListOfSongs;
		listOfFoundTracks.forEach((track) => {

			allArtsits.push({name: track.artist.name, album: track.album, song: track.title});
		});
		console.log(listOfFoundTracks);
		res.status(200).json({
			songs: allArtsits
		});
	} catch(err) {
		console.log(err);
	}
};

export const browseMusic = async (req, res) => {
	try { 
		const browseUrl = 'http://www.api.what-song.com/recent-movies/?limit=5';
		const recentMovies = await fetch(browseUrl);
		const foundMovies = await recentMovies.json();
		const listOfFoundMovies = foundMovies.data;
		listOfFoundMovies.forEach((movie) => {
			allMovies.push({_id: movie._id, name: movie.title, poster: movie.poster, release_date: movie.time_released, year: movie.year, view_songs: `http://www.api.what-song.com/movie-info/?movieID=${movie._id}` });
		});
		res.status(200).json({
			songs: allMovies
		});
	} catch(err) {
		res.status(404).json({
			error: err
		});
	}
};