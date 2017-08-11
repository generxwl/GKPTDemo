/*
	简易封装
	@author Dongwei
	@param (cls,style)==>cls代表要获取某个样式的className,style表示要获取的某个具体的样式
	@return 对象{color:"rgb()"}
	@example getCss('.public_color','color')
*/

function getCss(cls,style){
	var t =$('<div class="'+cls.slice(1)+'" style="display:hidden"></div>');
	$('body').append(t);
	var css = $(cls).css(style);
	var obj = {};
	obj[style] = css;
	return obj;
}
