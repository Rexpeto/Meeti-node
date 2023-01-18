import path from 'path';

export default {
    mode: 'development',
    entry: './public/js/app.js',  
    output: {
        filename: 'bundle.js',
        path: path.resolve('public/dist')
    },
    module: {
        rules: [    
        {
            test: /\.m?js$/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
            }
        }
        ]
    }
}