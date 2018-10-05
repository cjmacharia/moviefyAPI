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
		env: 'staging',
		db:  'mongodb://localhost:27017/staging',
		port: 3000
	},
};

export default config;
