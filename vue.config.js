const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  pages:{
          index:{
            // page 的入口
              entry:'src/main.js', 
            // 模板来源
              template:'public/index.html',
            // 在 dist/index.html 的输出
              filename:'index.html',
            // 当使用 title 选项时，
        	  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
              title:'index',
            // 提取出来的通用 chunk 和 vendor chunk。
        	  //chunks: ["chunk-vendors", "chunk-common", "index"]
          },
          jiankong2:{
              entry:'src/pages/jiankong2/jiankong2.js',
              template:'public/jiankong2.html',
              filename:'jiankong2.html',
              title:'jiankong2'
          },
          cockpit:{// 淮阴工学院驾驶舱入口
            entry:'src/pages/cockpit/cockpit.js',
              template:'public/cockpit.html',
              filename:'cockpit.html',
              title:'cockpit'
          },
          usage:{// 淮阴工学院驾驶舱之使用情况大数据总览入口
            entry:'src/pages/usage/usage.js',
              template:'public/usage.html',
              filename:'usage.html',
              title:'usage'
          }
      },
      devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:9080/api/monitor/getdata',
            ws: true,
            changeOrigin: true
          }
        }
      },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        "cockpit":resolve("src/components/cockpit"),
        "usage":resolve("src/components/usage"),
        "mycomponents":resolve("src/components/mycomponents"),
        "common":resolve("common")
      }
    },
  }
}