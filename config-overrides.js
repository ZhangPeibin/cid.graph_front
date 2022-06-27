// 按需打包: 只打包import引入组件的js/css 文件
const {override,fixBabelImports} = require('customize-cra');
const addLessLoader = require("customize-cra-less-loader");
module.exports = override(
    //针对antd的按需打包:根据import来打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
        lessLoaderOptions: {
            lessOptions:{
                javascriptEnabled: true,
                modifyVars: { '@primary-color': '#1DA57A' },
            }
        }
    })    
);