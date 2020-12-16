module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("raw")
      .test(/\.txt$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
  outputDir: "./backend/public/",
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  transpileDependencies: ["vuetify"],
};
