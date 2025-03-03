const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js', // Входная точка
    output: {
        filename: 'index.js', // Итоговый бандл
        path: path.resolve(__dirname, 'dist'), // Директория для выходных файлов
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Обрабатывать все .js файлы
                exclude: /node_modules/, // Исключить папку node_modules
                use: 'babel-loader', // Использовать babel-loader для транспиляции
            },
            {
                test: /\.(scss|css)$/, // Обрабатывать CSS и SCSS файлы
                use: [
                    MiniCssExtractPlugin.loader, // Извлекает CSS в отдельный файл
                    'css-loader', // Обрабатывает CSS
                    {
                        loader: 'postcss-loader', // Добавляет автопрефиксы
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass-embedded'),
                        }
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Обрабатывать изображения
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]', // Сохранять изображения в подкаталог img
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Генерация HTML-файла
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css', // Сохранять CSS в подкаталог css
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    devServer: {
        static: './dist', // Папка для разработки
        hot: true, // Включить горячую перезагрузку
        compress: true,
        port: 9000,
        proxy: [
            {
                context: ['/login', '/v1'],
                target: 'http://localhost:8080',
                secure: false,
            },
        ],
    },
    mode: 'development', // Режим разработки
};