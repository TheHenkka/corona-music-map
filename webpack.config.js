const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    devServer: {
        //Proxy is needed for Spotify. CORS issue.
        proxy: {
            '/regional': {
                target: 'https://spotifycharts.com',
                secure: false,
                changeOrigin: true
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