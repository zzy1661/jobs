const webpack = require('webpack')
module.exports = {
	pages: {
		cloud: {
			// page 的入口
			entry: 'src/pages/cloud/main.js',
			// 模板来源
			template: 'src/pages/cloud/cloud.html',
			// 在 dist/index.html 的输出
			filename: 'cloud.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: 'Cloud Page',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			//    chunks: ['chunk-vendors', 'chunk-common', 'cloud']
		},
		search: {
			entry: 'src/pages/search/main.js',
			template: 'src/pages/search/search.html',
			filename: 'search.html',
			title: 'Search Page',
		},
		index: {
			entry: 'src/pages/cloud/main.js',
			template: 'src/pages/cloud/cloud.html',
			filename: 'index.html',
			title: 'Cloud Page',
		}
		// 当使用只有入口的字符串格式时，
		// 模板会被推导为 `public/subpage.html`
		// 并且如果找不到的话，就回退到 `public/index.html`。
		// 输出文件名会被推导为 `subpage.html`。
		//  subpage: 'src/subpage/main.js'
	},
	configureWebpack: {
		plugins: [      
			new webpack.ProvidePlugin({        
				$: "jquery",
				        jQuery: "jquery",
				        "window.jQuery": "jquery"      
			})    
		]
	}

}