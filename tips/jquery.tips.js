/**
 * jQuery 	tips插件
 * @author 	midoks
 * @email	midoks@163.com
 */
(function($){
$.fn.extend({
tips:function(op){

    var _this = this;

	$.fn.tips.defaults = {
		eventName:'click',
		content:'你应该写些内容!!!',
		orientation:'bottom', //left, right, bottom, top
	};
	var opts = $.extend({}, $.fn.tips.defaults, op);

	$(this).bind(opts.eventName, function(){
        var _this = this;
        _find_pos(_this);

	});

    //找位置
    function _find_pos(c){
		var h = c.offsetHeight;
		var w = c.offsetWidth;
		var l = c.offsetLeft;
		var t = c.offsetTop;

		var pos_left,pos_top;
		//找到要显示的位置
		switch(opts.orientation){
			case 'left':pos_top = t;pos_left = l;//左
				//$('.main2').css('position', 'fixed').css('left', pos_left-208).css('top', pos_top);
				break;
            case 'right':pos_top = t;pos_left = l;//右
                //$('.main3').css('position', 'fixed').css('left', pos_left).css('top', pos_top);
				break;
			case 'bottom':pos_top = t + h;pos_left = l;//下
				//$('.main').css('position', 'fixed').css('left', pos_left).css('top', pos_top+8);
				break;
			case 'top':pos_top = t;pos_left = l;//上
                //$('.main4').css('position', 'fixed').css('left', pos_left).css('top', pos_top-36);
			    break;
		}
		//console.log(pos_top, pos_left);console.log(l,t);
		_create_tips(c, opts, pos_top, pos_left);
    }



    
    //创建tips样式
    function _create_tips(c, opts, tops, left){
		
		var default_style = {
			height:28,
			width:200,
			font:"12px Microsoft YaHei", //字体设置
			border:'1px solid #FF9900',//边框
			borderColor: '#FF9900',//边框颜色
			backgroundColor:'#FFFFCC', //背景颜色
			padding: 5, //内填充
			cPOS: 7, //像素
			pPOS: 35, //目标的位置
		};
		var style = $.extend({}, default_style, opts.style);

        //最外部的内容
		var wrap_div = createDom('div', {/*border : '1px solid red',*/});

        //定位ID
        var pos_div = createDom('div', {width : style.width,height: style.height,
            position : 'absolute',border: style.border, borderColor: style.borderColor});
		//$(pos_div).css('top', tops).css('left', left).css('top', 0);
	
//箭头开始
		var pos_div_relative = createDom('div',{/*left: '16px',*/position:'absolute'});

		var sign_left,sign_top, pos_div_relative_span1, pos_div_relative_span2;
		switch(opts.orientation){//找到要显示的位置
			case 'left':sign_left = 0;sign_top = -9; 
				$(pos_div_relative).css('right', 6).css('top', 8 + style.cPOS);
				//$(pos_div_relative).css('left', $(pos_div).width()-6).css('bottom', $(pos_div).height()/2);
				$(wrap_div).css('position', 'absolute').css('left', -($(pos_div).width()+10)).css('top', style.pPOS);
                pos_div_relative_span1 = createDom('span', { color: style.borderColor,
                                    position: 'absolute', left: sign_left, top: sign_top,});
                pos_div_relative_span2 = createDom('span',{color: style.backgroundColor, 
					position: 'absolute',left: (sign_left - 1), top:sign_top,});
				break;//左
			case 'right':sign_left = 0; sign_top = -9;
				$(pos_div_relative).css('left', 7).css('top', 8 + style.cPOS);
                //$(pos_div_relative).css('right', $(pos_div).width()-8).css('bottom', $(pos_div).height()/2);
                $(wrap_div).css('position', 'absolute').css('right', -9).css('top', style.pPOS);
                pos_div_relative_span1 = createDom('span', { color: style.borderColor,
                                    position: 'absolute', right: sign_left, top: sign_top,});
                pos_div_relative_span2 = createDom('span',{color: style.backgroundColor ,
					position: 'absolute', right: sign_left - 1, top:sign_top,});
                break;//右
			case 'bottom':sign_left = 0;sign_top = 9;
                $(pos_div_relative).css('left', 16+style.cPOS).css('top', -19);
                $(wrap_div).css('position', 'absolute').css('bottom', -10).css('left', style.pPOS);
                pos_div_relative_span1 = createDom('span', { color: style.borderColor,
                                    position: 'absolute', right: sign_left, top: sign_top,});
                pos_div_relative_span2 = createDom('span',{color: style.backgroundColor, 
					position: 'absolute', right: sign_left, top: sign_top+1,});
                break;//下
			case 'top':sign_left = 0;sign_top = 9;
                $(pos_div_relative).css('left', 16 + style.cPOS).css('top', 12);
                $(wrap_div).css('position', 'absolute').css('top', -($(pos_div).height()+11)).css('left', style.pPOS);
                pos_div_relative_span1 = createDom('span', { color: style.borderColor,
                                    position: 'absolute', right: sign_left, top: sign_top});
                pos_div_relative_span2 = createDom('span',{color: style.backgroundColor, 
					position: 'absolute', right: sign_left, top: sign_top-1});
                break;//上
		}

		$(pos_div_relative_span1).text('◆');
		$(pos_div_relative_span2).text('◆');
		$(pos_div_relative).append(pos_div_relative_span1).append(pos_div_relative_span2);
//箭头结束

        
        var pos_div_content = createDom('div',{padding: style.padding, background: style.backgroundColor});
        
		$(pos_div_content).css('height', (style.height-2*style.padding)).css('font', style.font).text(opts.content);
        $(pos_div).append(pos_div_relative).append(pos_div_content);
        $(wrap_div).append(pos_div);
		
		//delete dom
		$(c).css('position', 'relative').append(wrap_div).bind('mouseout', function(){
			$(wrap_div).remove();
		});
    }
    
    //创建div对象,并加上各种样式,返回
    function createDom(tagName, obj){
        var DomObj = document.createElement(tagName);
        for(i in obj){$(DomObj).css(i, obj[i]);}
        return DomObj;
    }
	return this;
//ed
}
//ed
});
//////////////////////////////////////end
})(jQuery);
