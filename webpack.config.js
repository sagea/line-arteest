const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
    const isProduction = env && env.production;
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        mode: isProduction ? 'production' : 'development',
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/index.html', to: 'index.html' },
            ], {
                copyUnmodified: true
            })
        ]
    }
};
