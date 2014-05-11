/**
 * jQuery 	滑块插件
 * @author 	midoks
 * @email	midoks@163.com
 */
(function($){

//////////////////////////////////////start
$.slider = $.fn.slider = function(options){
	//默认设置
	var opts = $.fn.slider.defaults = $.extend({}, $.fn.slider.defaults, options);
	
	_init(opts);

	//左右控制
	left_right(opts);
	//list控制
	list_control(opts);
	//检测是否transition
	var timer;
	animate_pic();

var t = 0;
/////////////下面为方法

function animate_pic(){
	timer = setInterval(function(){
		move_to_next();
    }, opts.delay);
}

function move_to_next(sj){
	if(typeof sj !== 'undefined'){
		t = t + sj;
	}else{
		t = t + 1;
	}
	var left = -t*500;

	var list = $(opts.PicList).children();
	var list_w = $(opts.PicList).width();
	var len = list.length;
	var len_pre = len - 1;//上现
	var len_next = len - 2;//下限

    $(opts.PicList).animate({left:left}, 300, function(){
		if(t>=4){t = 1;
			$(this).css('left', -(t*list_w) + 'px');
		}else if(t<=0){t = len_next;
			$(this).css('left', -(t*list_w) + 'px');
		}
		list_control_change(t-1);
    });
}


//初始化图片的div
function _init(opts){
	var list = $(opts.PicList);
	$(list).parent().css('position', 'absolute').css('overflow', 'hidden');
	var list_f = list.find('div:first');
	var list_l = list.find('div:last');
	//第一张图片
	$(list).append($(list_f).clone());
	//最后一张图片
	$(list_f).before($(list_l).clone());
	////
	$(list).css('position', 'relative');
	var list_w = list.width();

	var divList = $(list).find('div');
	divList.each(function(i,e){
		$(this).css('position','absolute').css('left', (i*list_w)+'px');
	});

	//初始化配置
	$(list).css('left', -list_w+'px');

	//固定图片的宽高
	var imgList = $(list).find('img');
	imgList.each(function(i){
		$(this).css('width', $(list).parent().width())
			.css('height', $(list).parent().height())
			.css('overflow', 'hidden');

		$(this).mouseover(function(){
			clearInterval(timer);
		}).mouseout(function(){
			animate_pic();
		});
	});
}

//对左右控制
function left_right(opts){
	var _top = ($(opts.PicList).height()/2)-($(opts.prevBtn).height()/2);
    //对左边和右边的按钮,样式处理
    var btn = {
        position: 'absolute',
        'text-align':'center',
        'top':_top,
        left:'0px',
        overflow: 'hidden',
        color: '#fff',
        cursor:'pointer',
        'background-color': 'rgba(0,0,0,0.3)',
        'font-weight':'bold',
        'font-size':'30px',
        display:'block',
		'line-height': $(opts.prevBtn).height()+'px',
    };
    $(opts.prevBtn).css(btn);
    btn.left = 'none';
    btn.right = '0px';
    $(opts.nextBtn).css(btn);

	
	$(opts.prevBtn).hover(function(){
		clearInterval(timer);	
	},function(){
		animate_pic();
	}).click(function(){
		clearInterval(timer);
		move_to_next(-1);
	});

	$(opts.nextBtn).hover(function(){
		clearInterval(timer);
	},function(){
		animate_pic();
	}).click(function(){
		clearInterval(timer);
		move_to_next();
	});
}


//下面的列表控制
function list_control(opts){
	var pw = $(opts.PicList).width();
	var a = $(opts.list + ' a');

	var list_uw_a = $(a).width() + 5;
	var list_uw_l = $(a).length;
	var list_uw = list_uw_a * list_uw_l;
	var left = (pw/2) - (list_uw/2);
	$(opts.list + ' ul').css('list-style', 'none');
	$(opts.list).css('position', 'absolute').css('bottom', '10px').css('left', left);
	var list_li = $(opts.list + ' li');
	$(list_li).css('float', 'left');
	var _list_li = list_li.toArray();
	_list_li.shift();
	$(_list_li).css('margin-left', '5px');
	$(a).css({
		cursor: 'pointer',
		display:'block',
		'padding-top': '9px',
		width: '9px',
		height:'0',
		'-webkit-border-radius':'50%',
		'-moz-border-radius':'50%',
		'-ms-border-radius':'50%',
		'-o-border-radius':'50%',
		'border-radius':'50%',
		overflow: 'hidden',
		backgroundColor:'blue',
	});

	list_li.each(function(i){
		$(this).hover(function(){
			clearInterval(timer);
		},function(){
			animate_pic();
		}).click(function(){
			t = i;
			move_to_next();
		});
		/*setInterval(function(){
			console.log(t);
		},1000);*/
		//$(this).find('a').css('backgroundColor', 'red');
	});
}

function list_control_change(pos){
	var list_li = $(opts.list + ' li');
	list_li.each(function(i){
		if(i==pos){
			$($(this).find('a')).css('backgroundColor', 'red');
			$($(this).siblings().find('a')).css('backgroundColor', 'blue');
		}
	});
}

//end
}
//默认配置
$.fn.slider.defaults = {
	wrap:null,		//外部的div
	delay:3000,
	debug:0,
	autoRun:true,	//自动执行
	start:0,
	_current:0,		//当前的元素
	prevBtn:null,	//向前一个
	nextBtn:null,	//向后一个
    list:null,      //下面的ul列表
    trans:true,    	//自己判断是否使用html5方式
	timer:null,		//定时器
}
//一些信息
$.fn.slider.info = function(){
	this.info = {author :'midoks',email:'midoks@163.com',version:'1.0'};
}
//调式
function D(err){
	if(this.obj.debug){console.log(err+"\r\n"+"如果你有什么好的建议,请告诉我:"+this.info.email);}
}
//检测是否支持transition
$.slider.transition = (function(){ 
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;       
    return support; 
})();
//////////////////////////////////////end
})(jQuery);
