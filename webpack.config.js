const path                    = require( 'path' );
const MiniCssExtractPlugin    = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserPlugin            = require( 'terser-webpack-plugin' );
const { CleanWebpackPlugin }  = require( 'clean-webpack-plugin' );

module.exports = {
	entry:        {
		main: './assets/index.js',
	},
	output:       {
		filename: '[name].js',
		path:     path.resolve( __dirname, 'dist' )
	},
	optimization: {
		minimizer:   [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin(),
		],
		splitChunks: {
			chunks:      'all',
			minSize:     0,
			cacheGroups: {
				vendors: {
					test:     /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks:          2,
					priority:           -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	module:       {
		rules: [
			{
				test:    /\.js$/,
				exclude: /(node_modules)/,
				use:     {
					loader:  'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /\.scss$/,
				use:  [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use:  [
					{
						// Using file-loader for these files
						loader: 'file-loader',

						// In options we can set different things like format
						// and directory to save
						options: {
							outputPath: 'images'
						}
					},
				],
			},
			{
				// Apply rule for fonts files
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use:  [
					{
						// Using file-loader too
						loader:  'file-loader',
						options: {
							outputPath: 'fonts'
						}
					}
				]
			}
		]
	},
	stats:        {
		colors: true
	},
	devtool:      'source-map',
	plugins:      [
		new MiniCssExtractPlugin( {
			                          filename: '[name].css'
		                          } ),
		new CleanWebpackPlugin()
	]
};