/*
 * @Author: jianwen.Wang
 * @Date: 2022-02-07 16:43:31
 * @LastEditTime: 2022-02-08 10:53:06
 * @LastEditors: jiawen.wang
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/ghostApi',
        createProxyMiddleware({
            target: 'https://numbrecodertest.53site.com:9919',
            // target: 'https://weirdoghost.com',
            changeOrigin: true,
            secure: false, // 接受运行在 https 上的服务
            pathRewrite: {
                '^/': '/',
            },
        }),
    )
}
