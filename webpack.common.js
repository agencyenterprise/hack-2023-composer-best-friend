const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

const envVars =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "https://api.composerpal.com",
        clerckApiKey:
          "pk_test_bWlnaHR5LW11c2tveC03Ny5jbGVyay5hY2NvdW50cy5kZXYk",
      }
    : {
        apiUrl: "http://localhost:4000",
        clerckApiKey:
          "pk_test_bWlnaHR5LW11c2tveC03Ny5jbGVyay5hY2NvdW50cy5kZXYk",
      }

module.exports = {
  context: __dirname,
  entry: {
    browserMain: "./src/index.tsx",
    // browserLanding: "./src/landing/index.ts",
    // browserCommunity: "./src/community/index.tsx",
  },
  output: {
    filename: "[name]-[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        loader: "url-loader",
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules", "src/main", "src/common"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      VERCEL_ENV: null,
      VERCEL_GIT_COMMIT_SHA: null,
      SENTRY_DSN: null,
      API_URL: envVars.apiUrl,
      REACT_APP_CLERK_PUBLISHABLE_KEY: envVars.clerckApiKey,
    }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   filename: "edit.html",
    //   chunks: ["browserMain"],
    //   template: path.join(__dirname, "public", "edit.html"),
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      chunks: ["browserMain"],
      template: path.join(__dirname, "public", "index.html"),
    }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   filename: "community.html",
    //   chunks: ["browserCommunity"],
    //   template: path.join(__dirname, "public", "community.html"),
    // }),
  ],
}
