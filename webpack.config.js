const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    devtool: '#eval-source-map',
    //devtool: 'inline-source-map',

    devServer: {
        //Proxy is needed for Spotify. CORS issue.
        proxy: {
            '/regional': {
                target: 'https://spotifycharts.com',
                changeOrigin: true,
                headers: {
                    Connection: 'keep-alive',
                }
            }
        }

    },

    

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },

            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },

    plugins: [
        new htmlPlugin({
            template: './src/index.html',
            fileName: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}