import xr from 'xr'
import blocksTemplate from '../templates/blocks.html'
import Mustache from 'mustache'

var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);


xr.get('https://interactive.guim.co.uk/docsdata-test/1ZKNpWWWzvJv_0oD8z3k24p1YGAQVPr2eT58D21cdzgE.json').then((resp) => {
		var sheets = resp.data.sheets;
		var html = Mustache.render(blocksTemplate, sheets);

		return html;
	});
