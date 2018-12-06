const config =  {
	development: {
		env: 'development',
		db:  'mongodb://localhost:27017/moviefy',
		port: 8000
	},
	test: {
		env: 'test',
		db:  'mongodb://localhost:27017/test',
		port: 3000
	},
	staging: {
		env: 'STAGING',
		db:  'mongodb+srv://cjmash:cj@cluster0-fsvnj.mongodb.net/moviefy',
		port: 3030
	},
};

export default config;
