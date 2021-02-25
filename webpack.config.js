const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const mode = process.env.NODE_ENV;

const isDev = mode === 'development';

const generatefilename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
  entry: {
    main: './js/index.js',
  },
  output: {
    filename: `./js/${generatefilename('js')}`,
    path: path.resolve(__dirname, 'build'),
  },
  mode,
  context: path.resolve(__dirname, 'src'),
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${generatefilename('css')}`,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'server',
          to: './'
        },
        {
          from: 'img/',
          to: 'img'
        }
      ]
    }),
    new ImageminPlugin({
      disable: isDev,
      pngquant: {
        quality: '50-55'
      },
      test: /\.(jpe?g|png|gif)$/i,
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ['ie >= 8', 'last 4 version']
                })
              ]
            }
          }
        },
        {
          loader: 'sass-loader',
        },
      ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.html$/i,
        use: ['html-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    open: true,
    port: 8080,
    hot: true,
    overlay: true,
    writeToDisk: true,
    historyApiFallback: true,
  },
  devtool: isDev && 'source-map',
};