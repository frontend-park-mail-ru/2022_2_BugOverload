const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');

const isProd = process.env.NODE_ENV === 'production';
const isAnalysed = process.env.STATS === 'stats';

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return config;
};

const addPlugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicons'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'src/assets/icons'),
                    to: path.resolve(__dirname, 'dist'),
                },
                {
                    from: path.resolve(__dirname, 'src/assets/img'),
                    to: path.resolve(__dirname, 'dist/assets/img'),
                },
                {
                    from: path.resolve(__dirname, 'src/sw.js'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.DefinePlugin({
            DOMAIN: JSON.stringify(process.env.DOMAIN_DEPLOY),
        }),
        // new WebpackPwaManifest({
        //     name: 'MovieGate',
        //     short_name: 'MovieGate',
        //     description: 'Movies to your liking',
        //     background_color: '#121212',
        //     crossorigin: 'use-credentials',
        //     display: 'standalone',
        //     icons: [
        //         {
        //             src: 'src/assets/favicons/android-chrome-192x192.png',
        //             sizes: '192x192',
        //             type: 'image/png',
        //         },
        //         {
        //             src: 'src/assets/favicons/android-chrome-512x512.png',
        //             sizes: '512x512',
        //             type: 'image/png',
        //         },
        //         {
        //             src: 'src/assets/favicons/apple-touch-icon.png',
        //             sizes: '180x180',
        //             type: 'image/png',
        //         },
        //         {
        //             src: 'src/assets/favicons/favicon-16x16.png',
        //             sizes: '16x16',
        //             type: 'image/png',
        //         },
        //         {
        //             src: 'src/assets/favicons/favicon-32x32.png',
        //             sizes: '32x32',
        //             type: 'image/png',
        //         },
        //     ],
        // }),
    ];

    if (isAnalysed) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
};

module.exports = {
    entry: {
        app: ['./src/index.ts'],
    },

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        plugins: [new TsconfigPathsPlugin()],
    },
    devtool: 'source-map',
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.handlebars$/,
                use: ['handlebars-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
        ],
    },
    plugins: addPlugins(),
};
