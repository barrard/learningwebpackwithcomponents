module.exports = {
    entry: "./client/js/index.js",
    output: {
        path: __dirname+'/client/js',
        filename: "bundle.js"
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
            ]
        }
                 
};