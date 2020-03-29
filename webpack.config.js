var path = require('path');
 
module.exports = {
    devtool: "source-map", // Enable sourcemaps for debugging webpack's output.
    entry: "./src/index.jsx", // входная точка - исходный файл
    output:{
        path: path.resolve(__dirname, './dist'),     // путь к каталогу выходных файлов - папка dist
        publicPath: '/dist/',
        filename: "bundle.js"       // название создаваемого файла
    },
    module:{
        rules:[   //загрузчик для js
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            }
        ]
    }
}