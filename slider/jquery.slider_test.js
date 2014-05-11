/**
 * jQuery 	滑块插件
 * @author 	midoks
 * @email	midoks@163.com
 */
(function($){
//////////////////////////////////////start
$.slider = function slider(obj){
	return new $.slider.prototype.init(obj);
}

$.slider.prototype = {
	info : {author :'midoks',email:'midoks@163.com',version:'1.0'},
	obj:null,//传递的操作数据
	//调试错误数据
	D : function(err){if(this.obj.debug){console.log(err+"\r\n"+"如果你有什么好的建议,请告诉我:"+this.info.email);}},

	init : function(obj){

		//默认设置
		this.obj = $.extend({
			id:null,
			delay:3000,
			debug:0,
			autoRun:true,
			start:0,
			_current:0,	//当前的元素
			prevBtn:null,	//向前一个
			nextBtn:null,	//向后一个
		}, obj || {});

		//父级元素
		var s = $(obj.id);
		if(typeof s[0] == 'undefined'){
			//滑动方向
			this.D("object init fail!!!", obj.debug);
		}else{
	        this.slider_init(this.obj);
		}
	},

	slider_init : function(obj){//初始化
		if(typeof obj.direction == 'undefined'){//一共4个的方向left,right,up,down
			this.obj.direction = 'left';
		}

		if(typeof obj.time == 'undefined'){//滑动时间
			this.obj.time = 3000;
		}

		if(typeof obj.len == 'undefined'){//图片元素数量
			obj.len  = ($(obj.id).find('img')).length;
		}
	
		if('left' == this.obj.direction || 'right' == this.obj.direction){
			this.slider_filter_left_right();
		}else if('up' == this.obj.direction || 'down' == this.obj.direction){
			this.slider_filter_up_down();
		}
		
	},

	//浮动
	slider_filter_left_right : function(){
		var obj = this.obj;
		var _this = this;

		var p = $(obj.id);
		var s_height = $(p).height();
		var s_width = $(p).width();

		this.obj._s_width = s_width;
		this.obj._s_height = s_height;


		$(p).css('overflow', 'hidden');

		var div = document.createElement('div');
		$(div).css('position', 'relative');

		var c = $(p).find('a');
		$(c).each(function(i){
			var tmp = $(c)[i];
			if(obj.direction=='left'){
				$(tmp).css('width', s_width).
					css('height', s_height).
					css('position', 'absolute').
					css('top', 0).css('left', i*s_width);
			}else if(obj.direction=='right'){
				$(tmp).css('width', s_width).
					css('height', s_height).
					css('position', 'absolute').
					css('top', 0).css('right', (obj.len-(i+1))*s_width);
			}
			$(div).append(tmp);
			tmp = null;
		});
		$(p).append(div);


		var img_p = $(obj.id).find('div');
	
		$(img_p).hover(function(){
			_this.lock = true;
		},function(){
			_this.lock = false;
		});

		$(this.obj.prevBtn).hover(function(){
			_this.lock = true;console.log(_this);
		},function(){
			_this.lock = false;console.log(_this);
		});

		$(this.obj.nextBtn).hover(function(){
			_this.lock = true;console.log(_this);
		},function(){
			_this.lock = false;console.log(_this);
		});

		$(this.obj.prevBtn).click(function(){
			_this.move(_this.obj._current-1);
		});

		$(this.obj.nextBtn).click(function(){
			_this.move(_this.obj._current+1);
		});


		setInterval(function(){
			if(!_this.lock){
				console.log(obj);
				_this.move(obj._current + 1);
			}
		},	obj.delay);

		
	},

	move : function(index){
		b = Math.abs(index % this.obj.len);
	
		this.obj._current = b;

		var t =  -b * this.obj._s_width;
		var img_p = $(this.obj.id).find('div');
		if(this.obj.direction == 'left'){
			$(img_p).animate({left: t}, this.obj.delay/3);
		}else if(this.obj.direction == 'right'){
			$(img_p).animate({right: t}, this.obj.delay/3);
		}

	},

	slider_filter_up_down : function(){
		var obj = this.obj;
	},

	//执行滑块操作
	S : function(obj){
		
	},

	//下一个元素
	next : function(obj){
		  
	},

	//上一个元素
	prev : function(){
		   
	},

	//特效
	effects : function(){

	}
};

$.slider.prototype.init.prototype = $.slider.prototype;
$.fn.slider = $.slider;
//////////////////////////////////////end
})($);
