/**
 * jQuery 	滑块插件
 * @author 	midoks
 * @email	midoks@163.com
 */
(function($){
//////////////////////////////////////start
function slider(obj){
	return new slider.prototype.init(obj);
}

slider.prototype = {
	//调试错误数据
	D : function(err, bool){if(bool){console.log(err);}},
	init : function(obj){
		

		//父级元素
		var sliderparent = $(obj.id);
		if(typeof sliderparent[0] == 'undefined'){
			//滑动方向
			slider.prototype.D("object init fail!!!", obj.debug);
		}else{
			slider.prototype.S_filter(obj);
		}
	},

	//浮动
	S_filter: function(obj){
		//父级元素
		var sliderparent = $(obj.id);
		if(typeof obj.direction == 'undefined'){//一共4个的方向left,right,up,down
			obj.direction = 'left';
		}
	
		var time = obj.time;
		if(typeof time == 'undefined'){//滑动时间
			time = 3000;
		}

			var len = obj.len;
		if(typeof len != 'undefined'){//判断是是否自
			len  = ($(sliderparent).children()).length;
		}

		/*var slider2=0;
		setInterval(function(){
			slider2 = slider2 === 3 ? 0 : slider2;
			var t = -slider2 * 375;
			$(sliderparent).children().each(function(i){
				console.log($(sliderparent).children()[i]);
				$($(sliderparent).children()[i]).css('position', 'relative');
				$($(sliderparent).children()[i]).animate({top: t}, 3000);	
			});
			slider2++;
			//console.log(slider2);
		},	4000);*/


		$(sliderparent).each(function(e){
			$(this).mouseover(function(v){
				v.preventDefault();
				var t = -e*375;
				$(sliderparent).animate({top:t},300);
			});
		});
		
	},

	//执行滑块操作
	S : function(obj){
		
	}, 

	//下一个元素
	next : function(obj){
		  
	},

	//上一个元素
	prev : function(){
		   
	}
};



//?
$.slider = $.fn.slider = slider;
//////////////////////////////////////end
})($);
