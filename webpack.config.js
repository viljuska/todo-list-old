const path                 = require( 'path' ),
      isProduction         = process.env.NODE_ENV === 'production', // true | false,
      MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
      // CopyWebpackPlugin    = require( 'copy-webpack-plugin' ),
      rootPath             = process.cwd(),
      paths                = {
	      root:       rootPath,
	      assets:     path.join( rootPath, 'assets' ),
	      dist:       path.join( rootPath, 'dist' ),
	      publicPath: '/',
	      entry:      {
		      'main': [
			      './scripts/main.js',
			      './styles/main.scss'
		      ]
	      }
      },
      webpack              = require( 'webpack' );

module.exports = ( env, arg ) => {
	return {
		mode: process.env.NODE_ENV || 'development',

		optimization: {
			chunkIds: 'natural'
		},

		stats: {
			hash:         false,
			version:      false,
			timings:      true,
			children:     false,
			errors:       true,
			errorDetails: true,
			errorStack:   false,
			warnings:     false,
			chunks:       false,
			modules:      false,
			reasons:      false,
			source:       false,
			publicPath:   false,
			assets:       true,
			assetsSort:   '!size',
			logging:      'none', // false | error | warn | info | verbose | true
			loggingTrace: true,
		},

		resolve: {
			symlinks: false,
			modules:  [ 'node_modules' ]
		},

		entry: paths.entry,

		context: paths.assets,

		output: {
			filename: 'scripts/[name].js',
			path:     paths.dist,
			// publicPath: `${ paths.publicPath }/${ path.basename( paths.dist ) }/`,
			publicPath:          'auto',
			assetModuleFilename: '[path][name][ext]',
			clean:               true,
			pathinfo:            false
		},

		module: {
			rules: [
				{
					test:    /\.js$/i,
					exclude: /node_modules/,
					use:     [ 'babel-loader' ]
				},
				{
					test: /\.(s[ac]|c)ss$/i,
					use:  [
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				},
				{
					test:   /\.(png|svg|jpe?g|gif|webp)$/i,
					type:   'asset',
					parser: {
						dataUrlCondition: {
							maxSize: 10 * 1024 // Default 8kb, set to 10kb
						}
					}
				},
				{
					test: /\.(woff2?|eot|ttf|otf)$/i,
					type: 'asset'
				}
			]
		},

		target: 'browserslist',

		plugins: [
			new MiniCssExtractPlugin( {
				filename: 'styles/[name].css'
			} ),
			// new CopyWebpackPlugin( {
			// 	                       patterns: [
			// 		                       {
			// 			                       from:             './images/**/*',
			// 			                       to:               '[path][name][ext]',
			// 			                       noErrorOnMissing: true
			// 		                       }
			// 	                       ]
			//                        } ),
			// Autoload required files
			new webpack.ProvidePlugin( {
				regeneratorRuntime: 'regenerator-runtime', // Necessary for using dynamic imports with Babel
			} ),
			new webpack.ProgressPlugin( {
				handler:           ( percentage, message, ...args ) => {
					console.info( `${ Math.floor( percentage * 100 ) }% - ${ message } | `, ...args );
				},
				activeModules:     false,
				entries:           false,
				modules:           true,
				modulesCount:      5000,
				profile:           true,
				dependencies:      true,
				dependenciesCount: 10000,
				percentBy:         'entries',
			} ),
		],

		devtool: !isProduction ? 'source-map' : false,
	};
};
