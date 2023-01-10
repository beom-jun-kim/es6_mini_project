const { version } = require("os");
const path = require("path"); //노드 모듈 중에 path를 가져와서 사용
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, '/public'),
    },
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // index.html 템플릿을 기반으로 빌드 결과물을 추가해줌
      template: 'index.html', //html파일 경로 및 파일명 확인
    }),
  ],     
  entry: "./src/index.js", //기준
  output: {
    filename: "bundle.js", //결과파일
    path: path.resolve(__dirname, "./dist"),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '/src'),
        use: {
          loader: "babel-loader",
          options: {
            preets: [
              [
                "env",
                {
                  "targets": {
                    "browsers": ["last 2 versions"],
                  },
                  "debug": false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports.plugins = (module.exports.plugins || []).concat([
  //   {...},
  new BundleAnalyzerPlugin(), //이걸 추가해 주세요.
]);
