const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/admin', {
    target: 'http://47.97.26.45:7001',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/admin": "/admin"
    }
  }))
}
