/**
 *	@author midoks
 *  @email	midoks@163.com
 *	规则说明


 */

(function($){
//
$.validform = $.fn.validform = function(sel, callback){

//默认规则
var mregx = {
	'email' : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,	//邮件验证
	'telephone': /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,//固定电话
	'mobile': /^(1(([35][0-9])|(47)|[8][0126789]))\d{8}$/,//移动电话
	'credit': /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证
	'zipcode':/^[1-9][0-9]{5}$/,//邮编验证
	'ip':/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g,//IP验证
	'url':/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/i, //URL验证
};

//验证规则是否通过通过
function verify_ok(obj){

	var value = $(obj).val();
	var regx = $(obj).attr('regx');
	var error = $(obj).attr('error');
	var point = $(obj).attr('point');
	var nCName = $(obj).next();//同级标签

	//console.log(error);
	var sre = mregx[regx];
	if(!sre){
		sre = regx;
	}
	var re = new RegExp(sre);
	if(!re.test(value)){
		if (point == $(nCName).attr('class')) {//下一个和指定的class 相同时

			$(nCName).css('color', 'red').text(error);
			
			callback(obj, false);
		};
		return false;
	}else{
		$(nCName).css('color', 'blue').text("");


		callback(obj, true); 
	}
	return true;
}

//对每一个input 进行绑定
var inputs = $(sel).find('input:not(:submit)');
$(inputs).each(function(i){
	//焦点离开事件
	$(this).focusout(function(){
		verify_ok(this);
	});
});

//提交事件
$(sel).submit(function(){
	var r = true;
	$(inputs).each(function(i){
		if(!verify_ok(this)){
			r = false;
		}
		callback(this, r);
	});
	return r;
});


/////
};
//
})($);