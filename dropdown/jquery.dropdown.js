(function($){
//start
$.fn.extend({
//s
dropdown:function(option, callback){
    var default_op = {
        selector:null,
        FormID: null,
        reget:true,
        sign:'midoks_'+new Date().getTime().toString(),
        input_time:600,
    };    
    //console.log(option);
    var option = $.extend({}, default_op, option);

    if(option.selector){
        $('#' + option.selector).attr('autocomplete', 'off');
    }

    $(document).bind('click', function(e){
        var id = e.target.id;
        if(option.selector != id){
            $('#'+option.sign).css('display', 'none');
        }
    });

    //预备..
$('head').append("<style>.dropdown_on{background:#ebebeb;} .dropdown_leave{background:white;}</style>");

var _id_string = '<div style="position:absoulte;border:1px solid #817F82;font:14px;font-family:Microsoft Yahei;cursor:pointer;display:none;"><ul style="list-style:none;padding:0px;width:100%;margin:0px;"></ul></div>';

var _r_str = $(_id_string).attr('id', option.sign);

$('body').append(_r_str);
    

     function keydown_G(e){
        //console.log(e.keyCode);

        var list = $('#'+option.sign+' ul').find('li');
        var count = list.length;//总数
        //console.log(count);
        //console.log("总数:"+count);

        var current_num = -1;
        for(var i=0; i<count; i++){
            var list_i = list[i];
            var tmp = $(list_i).attr('class');
            //console.log("tmp:"+tmp);
            if('dropdown_on' == tmp){
                current_num = i;
                //console.log("each:"+i);
            }else if(typeof tmp == 'undefined'){
                current_num = -1;
            }
        }
        //console.log("当前:"+current_num);
        if(40 == e.keyCode){
            //console.log("↓");//↓
            //++current_num;
            if((current_num+1) >= count){current_num = -1;}
            current_num = current_num+1; 
            $(list).removeClass();
            $(list[current_num]).removeClass().addClass('dropdown_on');
        }

        if(38 == e.keyCode){
            //console.log("↑");//↑
            if((current_num-1) < 0){current_num = count;}
            current_num = current_num-1;
            $(list).removeClass();
            $(list[current_num]).removeClass().addClass('dropdown_on');
        }

        if(13 == e.keyCode){
            //console.log("回车");//回车
            var list_cc = $('#'+option.sign+' ul li.dropdown_on');
            //console.log(list_cc);
            if(list_cc[0]){//有选择
                $('#'+option.selector).val($(list_cc).text());
                //console.log($(list_cc).text());
                $('#'+option.FormID).submit();
            }else{//没有选择的
                //var select_txt = $('#'+option.selector).val();
                if('' != $('#'+option.selector).val()){
                    $('#'+option.FormID).submit();
                }
            }
        }
    }
    $(document).bind('keydown', keydown_G);


    function getInputList(o){
        var val = $(o).val();
        if(val != ''){
            getInputList_Main(o);
        }
    }

    //ajax | 数据
    function ajax_get_data(callback){
        $.ajax({
            url: "http://localhost/dropdown/json.php",
            type: "GET",
            //dataType: 'jsonp',
            //jsonp: 'jsoncallback',
            //data: qsData,
            timeout: 3000,
            success: function(json){
                var data = eval('('+json+')');
                if(typeof callback == 'function'){
                    callback(data);
                }
            },
            error: function(xhr){
                //console.log(xhr);
            }
        });
    }

    
    var list_li_sign = null;
    function getInputList_Main(o){
        

        //console.log(o);
        var h = o.offsetHeight;
		var w = o.offsetWidth;
		var l = o.offsetLeft;
		var t = o.offsetTop;



        //if('block'==$('#'+option.sign).css('display')){
        //}else{}
        //$('#'+option.sign).css('display', 'none');
        $('#'+option.sign+' ul').html('');
        $(document).unbind('keydown').bind('keydown', keydown_G);

        ajax_get_data(function(list){
            //console.log(list);
            if(list){
                for(i in list){
                    //console.log(i, list[i]);
                    $('#'+option.sign+' ul').append('<li style="color:#000;width:100%;height:30px;line-height:30px;text-indent:1px;"'
                        +' class="dropdown_leave">'+'<span style="width:100%;">'+(list[i])+'</span></li>');
                    //$('#'+option.sign+' ul').append('<li style="color:#000;width:100%;height:30px;line-height:30px;text-indent:1px;">'
                     //   +'<span style="width:100%;">'+(list[i])+'<b>cc</b></span></li>');
                }
                //console.log(h,w,l,t);
                $('#'+option.sign).css({
                    'top':t+h,
                    'left':l,
                    'position':'absolute',
                    'width':w-2,
                    'height':'auto',
                    'overflow':'hidden',
                    'color':'blue',
                    'display':'block',
                });
                list_li_sigin(o);
                //事件绑定一次
                if(!list_li_sign){
                    list_li_sign = true;
                }
            }
        });
    }

    //创建列表
    function list_li_sigin(o){
        $(o).bind('focus', function(){
            $('#'+option.sign).css('display', 'block');
        });

        var list_li = null;
        list_li = $('#'+option.sign).find('li');
        list_li.each(function(i){
            var list_i = this;
            var val_list = $(list_i).text();
            $(list_i).bind('click',function(){
                $(o).val(val_list);
                $('#'+option.sign).css('display', 'none');
            }).bind('mouseover', function(){
                $(list_i).removeClass().addClass('dropdown_on');
            }).bind('mouseout', function(){
                $(list_i).removeClass().addClass('dropdown_leave');
            });
        });
    }



////////////////////////////////////////////////////////////////////
    //监听内容改变
    //很完美
    
    //限制输入速度
    var time_ID = null;
    var tmpObj = $('#'+option['selector']);
    if(tmpObj[0]){  
        $(tmpObj).bind('input propertychange', function(){
            var _this = this;
            clearTimeout(time_ID);
            time_ID = setTimeout(function(){
                getInputList(_this);
            }, option.input_time);
        });
    }
    //监听内容改变
    //很完美
    /*$(this).bind('input propertychange', function(){
        getInputList(this);
    });*/ 

    //有个bug,它会监听页面上所有的input
    /*$(_this).context.onpropertychange=function(){
	    getInputList(_this);
    }
    if(typeof window.addEventListener == 'function'){
	    $(_this).context.addEventListener('input', function(){
            getInputList(_this);
	    }, false); 
    }*/
    return this;
//stop
},
//e
});
//end
})(jQuery);
