'use strict';
import  mongoose from 'mongoose';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
	_id: Schema.Types.ObjectId,
	songid: {
		type:Number,
		required:[true, 'the song Id id missing'],
		trim: true,
	},
	moviesong: {
		type:Number,
		required:[true, 'The movie is missing'],
		trim: true,
	},
	owner: {
		type: String,
		required: [true, 'The user Id is missing'],
		trim: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	last_modified: {
		type: Date,
		default: Date.now,
	}
});

const favorite = mongoose.model('Favorite', favoriteSchema);

export default favorite;


