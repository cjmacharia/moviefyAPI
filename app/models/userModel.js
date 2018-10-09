'use strict';
import  mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type:String,
		required:[true, 'please provide a name before proceeding'],
		trim: true,
	},
	email: {
		type:String,
		required:[true, 'please provide an email before proceeding'],
		unique: [true, 'The email must be unique'],
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'password field cannot be empty'],
		trim: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	last_modified: {
		type: Date,
		default: Date.now,
	},
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

export default User;


