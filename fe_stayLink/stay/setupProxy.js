const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시 경로 (React에서 이 경로로 요청하면 Spring Boot로 전달)
    createProxyMiddleware({
      target: 'http://localhost:8080', // Spring Boot 서버 주소
      changeOrigin: true,
    })
  );
};
