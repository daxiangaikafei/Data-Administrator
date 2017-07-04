var webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');

var minSize = {
    minChunkSize: 51200,
    compress: {
        warnings: false
    }
}
function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    console.log("啊哈",dependencies)
    let externals = {};
    for (let p in dependencies) {
        
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}


let externals = _externals();

//console.log(externals);
module.exports = {
    entry: {
        app: "./app/app.ts"
    },
    target: "node",
    node: {
        console: false,
        global: false,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false
    },
    // devtool: "source-map", 
    output: {
        path: __dirname + "/dist",
        filename: "app.js",
        chunkFilename: 'build[name]-[chunkhash:8].js'
    },
    externals: externals,
    module: {
        //noParse: /node_modules/,
        noParse: /node_modules\/(jquey|moment|chart|lodash\.js)/,
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack
            .optimize
            .MinChunkSizePlugin(minSize),
        new webpack
            .optimize
            .LimitChunkCountPlugin({maxChunks: 50, entryChunkMultiplicator: 2}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new UglifyEsPlugin()
        // new webpack
        //     .optimize
        //     .UglifyJsPlugin({
        //         compress: {
        //             drop_console: true,
        //             warnings: false
        //         }
        //     })
    ]

};