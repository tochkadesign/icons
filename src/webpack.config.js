const path = require('path');

module.exports = {
	entry: './src/index.js',
	target: 'node',
	output: {
		filename: 'job.js',
		path : path.resolve(__dirname, 'bundle')
	}
};