const { createProxyMiddleware } = require("http-proxy-middleware");
// 挂代理的意思就是如果你想要访问： http://45.32.22.133:8000/auth 你只需要访问 /api/auth 就可以了。
const TargetUrl = "http://45.32.22.133:8000"
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", { // /api是自定义的，用的时候直接写/api/auth就可以了
      target: TargetUrl, // 请求的地址
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
}
