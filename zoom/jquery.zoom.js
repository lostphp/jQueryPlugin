/**
 * 放大镜编写
 * @author midoks
 * @mail midoks@163.com
 */
(function($){
//start
var option_default = {
	selected:null, //选择DOM对象
	markSize:[100, 100], //遮罩大小(top, left)
	zoomBox:[400, 400],
	left: 30,
	top : 0,
	zoomMarkName:'midoks_mark_', //放大的
	zoomBoxName:'midoks_zoom_',
};


/*
function getTop(e){
	var offset = e.offsetTop;
	if(e.offsetParent!=null){
		offset += getTop(e.offsetParent);
	}
	return offset;
}
function getLeft(e){
	var offset = e.offsetLeft;
	if(e.offsetParent!=null){
		offset += getLeft(e.offsetParent);
	}
	return offset;
}*/

$.zoom = $.fn.zoom = function(option){
	var opts = $.extend({}, option_default, option);
	var _tmp_zoomMarkName = opts.zoomMarkName;
	var _tmp_zoomBoxName = opts.zoomBoxName;
	//var BoxRace = 3;
	var BoxRace = opts.zoomBox[0]/opts.markSize[0];

	$(opts.selected).bind('mouseover', function(e){
		var rtop = e.clientY;
		var rleft = e.clientX;
	
		var rboxname= $('#' + opts.zoomMarkName);
		if(rboxname[0]){
		}else{
			
			//图片的box
			var Box = [ $(opts.selected).height(), $(opts.selected).width(), $(opts.selected).offset().left, $(opts.selected).offset().top];
			var BLimit = {Top:Box[3],Bottom:Box[0]+Box[3],Left:Box[2],Right:Box[1]+Box[2]};

			//右边控制
			var eleft = rleft - opts.markSize[1]/2;
			var etop = rtop - opts.markSize[0]/2;

			//边界判断
			eleft = eleft < BLimit.Left ? BLimit.Left : eleft;
			etop = etop < BLimit.Top ? BLimit.Top : etop;
			eleft = (eleft + opts.markSize[1]) > BLimit.Right ? (BLimit.Right - opts.markSize[1]) : eleft;
			etop = (etop + opts.markSize[0]) > BLimit.Bottom ? BLimit.Bottom - opts.markSize[0] : etop;

			//创建mark
			opts.zoomMarkName = _tmp_zoomMarkName + new Date().getTime().toString();
			var div_mark = $('<i></i>').attr('id', opts.zoomMarkName)
				.css('background', '#FEDE4F').css('position', 'absolute')
				.css('cursor', 'move').css('opacity', '0.5')//.css('display', 'none')
				.css('filter', 'alpha(opacity=50)').css('top', etop).css('left', eleft)
				.height(opts.markSize[0]).width(opts.markSize[1]);

			//创建zoom
			opts.zoomBoxName = _tmp_zoomBoxName + new Date().getTime().toString();
			var div_img = $(this).find('img')[0] || $(this);
			var new_div_img = $(div_img).clone().removeAttr('id').css('position', 'relative')
				.css('padding', 0).css('margin', 0);
			
			var div_zoom = $('<div></div>').attr('id', opts.zoomBoxName)
				.css('background', 'white').css('position', 'absolute').css('padding', 0).css('margin', 0).css('overflow', 'hidden')
				.css('top', $(this).offset().top + opts.top).css('left', $(this).offset().left + $(this).width() + opts.left)
				.width(opts.zoomBox[1]).height(opts.zoomBox[0]).append(new_div_img.width($(div_img).width()*BoxRace).height($(div_img).height()*BoxRace));
			//添加上
			$(this).parent().append(div_mark);
			$(this).parent().append(div_zoom);
			add_mark_event();
		}
	}).bind('mousemove', function(e){
		mark_speed_move(e);
	});

	//添加遮罩事件
	function add_mark_event(){
		$('#' + opts.zoomMarkName).bind('mousemove', function(e){
			mark_speed_move(e);
		}).bind('mouseout', function(){
			//删除mark
			$(this).remove();
			$('#' + opts.zoomBoxName).remove();
		});
	}

	var timeID = null;
	function mark_speed_move(e){
		//速度控制
		clearTimeout(timeID);
		timeID = setTimeout(function(){mark_move(e);}, 10);
	}

	function mark_move(e){	
		//当前鼠标的位置
		var rtop = e.clientY;
		var rleft = e.clientX;

		//图片的box
		var Box = [ $(opts.selected).height(), $(opts.selected).width(), $(opts.selected).offset().left, $(opts.selected).offset().top];
		var BLimit = {Top:Box[3],Bottom:Box[0]+Box[3],Left:Box[2],Right:Box[1]+Box[2]};

		//右边控制
		var eleft = rleft - opts.markSize[1]/2;
		var etop = rtop - opts.markSize[0]/2;

		//边界判断
		eleft = eleft < BLimit.Left ? BLimit.Left : eleft;
		etop = etop < BLimit.Top ? BLimit.Top : etop;
		eleft = (eleft + opts.markSize[1]) > BLimit.Right ? (BLimit.Right - opts.markSize[1]) : eleft;
		etop = (etop + opts.markSize[0]) > BLimit.Bottom ? BLimit.Bottom - opts.markSize[0] : etop;
		//遮罩的位置
		$('#' + opts.zoomMarkName).css('top', etop).css('left', eleft);
		//zoom控制
		$('#' + opts.zoomBoxName).find('img').css('top', -(etop-Box[3])*BoxRace).css('left', -(eleft - Box[2])*BoxRace);
	}//end mark move
}
//end
})($);
