var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/app/app.js',
        './src/scss/style.scss'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/app.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/style.css'),
    ],
};