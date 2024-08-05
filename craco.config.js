const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'report.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    ],
    configure: (webpackConfig) => {
      // Add CSS and SCSS optimization
      webpackConfig.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
        splitChunks: {
          chunks: 'all',
        },
      };

      // Add image optimization
      const imageLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      };

      webpackConfig.module.rules.push(imageLoader);

      // Use MiniCssExtractPlugin to handle CSS and SCSS
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf instanceof Array) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.test && oneOf.test.toString().includes('css')) {
              oneOf.use = [
                MiniCssExtractPlugin.loader,
                'css-loader',
              ];
            }
            if (oneOf.test && oneOf.test.toString().includes('scss')) {
              oneOf.use = [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
              ];
            }
          });
        }
      });

      return webpackConfig;
    },
  },
};
