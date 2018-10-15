import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Favorite from '../models/favoriteModel';
import * as responses from '../utils/response';

const apiUrl = 'http://www.api.what-song.com/';
const favoriteSoundTracks= [];
const mySongs = [];
const myHeader = {
	'Content-Type': 'application/json',
	'Authorization': '1yJQUEjLRGrNKOaqTMA1gXCIh3qaZSetEnnGXW0Ydz1bGpme',
	'Accept-Encoding' : 'gzip, deflate'
};

export const favoritesUserDetails = async () => {
	try {

		const userUrl = `${apiUrl}me`;
		const userData = await fetch(userUrl, { 
			headers: myHeader 
		});
		const foundData = await userData.json();
		return foundData.data.username;

	} catch(err) {
		return err;
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
		responses.serverError(res, err);
	}
};

export  const unFavouriteTrack = async (req, res) => {
	try {

		const sId = req.params.sId;
		const userId = req.userData.userId;
		await Favorite.deleteMany( {$and: [ { owner: userId }, { songid: sId } ] }, (err) => {
			if (err) {
				responses.validationError(res, err);
			} else {
				responses.successfullResponse(res);
			}
		});

	} catch(err) {
		responses.serverError(res, err);
	}
};

export const getFavorites = async () => {
	try {

		const userName = await favoritesUserDetails();
		const favoriteTracks = await fetch(`${apiUrl}list-of-songs-favorited?username=${userName}`);
		const foundfavorites = await favoriteTracks.json();
		const tracks = foundfavorites.data;
		tracks.forEach((track) => {
			favoriteSoundTracks.push({
				id: track._id,
				name: track.artist.name, 
				album: track.album, 
				song: track.title, 
				spotify: track.spotify, 
				albumId: track.spotifyAlbumId
			});
		});
		return favoriteSoundTracks;

	} catch (err) {
		return err;
	}
};

export const filterFavoritesByUser = async (req, res) => {
	try {

		await getFavorites();
		const userId = req.userData.userId;
		const result = await Favorite.find({owner: userId});
		return result;

	} catch(err) {
		return err;
	}
};

const removeDuplicates = (myArr, prop) => {
	return myArr.filter((obj, pos, arr) => {
		return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
	});
};

export const displayMyFavourites = async (req, res) => {
	try {

		let id;
		let userFavorites = await filterFavoritesByUser(req, res);
		let allFavorites = await getFavorites();
		userFavorites.forEach((favorite) => {
			id = favorite.songid;
			allFavorites.forEach((song) => {
				if (id === song.id ){
					mySongs.push(song);
				}
			});
		});

		let uniqueSongs= removeDuplicates(mySongs, 'id');
		responses.getResultsSuccess(res, uniqueSongs);

	} catch(err) {
		responses.serverError(res, err);
	}
};