const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

const envVars =
  process.env.NODE_ENV === "production"
    ? {
        apiUrl: "https://api.composerpal.com",
        clerkApiKey: "pk_test_bWlnaHR5LW11c2tveC03Ny5jbGVyay5hY2NvdW50cy5kZXYk",
      }
    : {
        apiUrl: "http://localhost:4000",
        clerkApiKey: "pk_test_bWlnaHR5LW11c2tveC03Ny5jbGVyay5hY2NvdW50cy5kZXYk",
      }

module.exports = {
  context: __dirname,
  entry: {
    browserMain: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[chunkhash].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        loader: "url-loader",
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
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
      REACT_APP_CLERK_PUBLISHABLE_KEY: envVars.clerkApiKey,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      chunks: ["browserMain"],
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
}
