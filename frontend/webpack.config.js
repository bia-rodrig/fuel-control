const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'public'),
    },
    module:{
        rules: [
            {
               test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
								exclude: /node_modules/,
								use:[
									{ loader: 'style-loader' },
									{ loader: 'css-loader' },
								]
            },
						//loader de imagens
						{
							test: /.*\.(gif|png|jpe?g)$/i,
							//.asterisco: todos os arquivos
							//\. indica o ponto da extensão mesmo
							//(todos os formatos que aceita)
							//e? pode ter letra e ou não (jpeg ou jpg)
							//i torna a case insencitive. aceita maiuscula ou minuscula
							
							use:{
								loader: 'file-loader',
							}
						}
        ]
    }
}