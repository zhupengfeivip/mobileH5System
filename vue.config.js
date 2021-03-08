module.exports = {
    outputDir: 'dist',
    publicPath: '',
    productionSourceMap: false, //不在production环境使用SourceMap
    devServer: {
        //跨域
        port: 8080, // 端口号
        open: true, //配置自动启动浏览器
        proxy: {
            // 配置跨域处理 可以设置多个
            '/api': {
                target:
                    'http://localhost:8080/',
                ws: true,
                changeOrigin: true
            }
        }
    },
};
