const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'//true ou false
const cssDev = [
    'style-loader',//seta o css que está no bundler no head no HTML
    'css-loader',//carrega os arquivos .css para o bundler JS
    'sass-loader'//converte sass em css
]
const cssProd = [
    MiniCssExtractPlugin.loader,//extrai o css do bundler JS e cria um novo arquivo    
    'css-loader',
    'sass-loader'
]
const cssConfig = isProd ? cssProd : cssDev

module.exports = {
    entry: './src/index.js',    
    output: {
        path: __dirname + '/build',
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,            
            filename:'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename:'pages/cursos.html',
            template: './src/assets/pages/cursos.html'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename:'pages/inicio.html',
            template: './src/assets/pages/inicio.html'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename:'pages/sobre.html',
            template: './src/assets/pages/sobre.html'
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename:'pages/suporte.html',
            template: './src/assets/pages/suporte.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules:[ 
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },           
            {
                test: /\.s?[ac]ss$/,
                use: cssConfig
            },            
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',//scaneia os arquivos e executa onde tiver referencia de import ex: url(), src=''
                        options: {
                            name: 'assets/img/[name].[ext]',//caminho destino, mesmo nome, mesma extensão
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,
                            disable: false, 
                        }
                    }
                ]
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    'url-loader?limit=10000',
                    {
                        loader: 'file-loader',//scaneia os arquivos e executa onde tiver referencia de import ex: url(), src=''
                        options: {
                            name: 'assets/fonts/[name].[ext]',//caminho destino, mesmo nome, mesma extensão
                        }
                    }
                ]
              },
              {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,                 
                loader:'file-loader',
                options: {
                    name: 'assets/fonts/[name].[ext]',//caminho destino, mesmo nome, mesma extensão
                }
              }
        ]
    },
    devServer: {
        contentBase:'./build', 
        hot: true,
        compress: true,
        port: 9000,
        stats: 'errors-only',//diminue a mensagem no console ao carregar o servidor
        open: true//abre o browser automatico

    }
}
