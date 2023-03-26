/* eslint-disable no-undef */

const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { DefinePlugin } = require("webpack");

const urlDev = "https://localhost:3000/";
const urlProd = "{{webaddin-path}}";
const hostProd = "{{origin}}";

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      readpane: ["./src/readpane/readpane.js", "./src/readpane/readpane.html"],
      compose: ["./src/compose/compose.js", "./src/compose/compose.html"],
      splash: ["./src/splash/splash.js", "./src/splash/splash.html"],
      commands: "./src/commands/commands.js",
    },
    output: {
      clean: true,
      path: path.resolve(__dirname, "../resources/webaddin/"),
      filename: "[name].[contenthash].js",
    },
    resolve: {
      extensions: [".html", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new DefinePlugin({
        API_URL: dev ? JSON.stringify("http://localhost:8080") : JSON.stringify(""),
      }),
      new HtmlWebpackPlugin({
        filename: "readpane.html",
        template: "./src/readpane/readpane.html",
        chunks: ["polyfill", "readpane"],
      }),
      new HtmlWebpackPlugin({
        filename: "compose.html",
        template: "./src/compose/compose.html",
        chunks: ["polyfill", "compose"],
      }),
      new HtmlWebpackPlugin({
        filename: "splash.html",
        template: "./src/splash/splash.html",
        chunks: ["polyfill", "splash"],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "assets/*",
            to: "assets/[name][ext][query]",
          },
          {
            from: "manifest*.xml",
            to: "[name]" + "[ext]",
            transform(content) {
              if (dev) {
                return content;
              } else {
                return content
                  .toString()
                  .replace(new RegExp(urlDev, "g"), urlProd)
                  .replace(new RegExp("https://www.contoso.com", "g"), hostProd);
              }
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "commands.html",
        template: "./src/commands/commands.html",
        chunks: ["polyfill", "commands"],
      }),
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      server: {
        type: "https",
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000,
    },
    stats: {
      errorDetails: true,
    },
  };

  return config;
};
