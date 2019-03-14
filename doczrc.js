import { css } from 'docz-plugin-css'

export default {
	title: 'Dynamic Survey Docs',
	indexHtml: 'public/index.html',
	plugins: [
  		css({
			preprocessor: 'postcss',
			cssmodules: true
		})
	]
};
