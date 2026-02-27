const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fallback özelliğini doğru şekilde ayarlayın
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          "os": require.resolve("os-browserify/browser"),
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "https": require.resolve("https-browserify"),
          "http": require.resolve("http-browserify"),
          "url": require.resolve("url"),
        }
      };
      
      webpackConfig.plugins.push(new NodePolyfillPlugin());
      return webpackConfig;
    }
  }
};
