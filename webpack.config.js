var webpack = require("webpack");
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var minSize = {
    minChunkSize: 51200,
    compress: {
        warnings: false
    }
}


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
    output: {
        path: __dirname + "/dist",
        filename: "app.js",
        chunkFilename: 'build[name]-[chunkhash:8].js'
    },
    module: {
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
        new webpack
            .optimize
            .UglifyJsPlugin({
                compress: {
                    drop_console: true,
                    warnings: false
                }
            })
    ]

};