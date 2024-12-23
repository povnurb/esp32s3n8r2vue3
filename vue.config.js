const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg|json|ico|png|woff|woff2)(\?.*)?$/i,
        threshold: 0,
        minRatio: Infinity,
      }),
    ],
  },
});

/*
  // https://stackoverflow.com/questions/77752897/feature-flag-vue-prod-hydration-mismatch-details-is-not-explicitly-defined
*/
/*
const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = defineConfig({
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
  },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        // Replace with true if detailed mismatch info is needed
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      }),
      new CompressionWebpackPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg|json|ico|woff|woff2)(\?.*)$/i,
        threshold: 0,
        minRatio: Infinity,
      }),
    ],
  },
});
*/
