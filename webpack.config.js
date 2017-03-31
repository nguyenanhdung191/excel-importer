let webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: "./js/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015", "stage-0"]
                }
            }
        ]
    },

};