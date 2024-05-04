// next.config.js
module.exports = {
	images: {
        domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com']
    },
	webpack(config, options) {
	  if (!options.isServer) {
		config.devtool = 'source-map';
	  }
	  return config;
	},
	experimental: {
		turbo: {
		  rules: {
			'*.svg': {
			  loaders: ['@svgr/webpack'],
			  as: '*.js',
			},
		  },
		},
	  },
  };