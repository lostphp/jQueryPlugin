/**
 *	@author midoks
 *	@email midoks@163.com
 *	@time 2015-4-4
 *	@func 是为了在手机上便于简单测试
 *  @version 1.0
 *	0.截住错误显示在页面上
 *	1.使用d方法代替console.log的测试。
 */
(function(){


function is_null(exp){
	if (!exp && typeof exp != "undefined" && exp != 0){
    	return true;
    }
    return false;
}

function is_null2(exp){
	if (exp === null){
    	return true;
	}
	return false;
}

function is_array(object){
    return object && typeof object==='object' &&
            Array == object.constructor;
}

function Gid(id){
	return document.getElementById(id);
}

function CDiv(){
	return document.createElement("div");
}

function getFileName(o){
    var pos = o.lastIndexOf("/");
    return o.substring(pos+1);  
}

function getWebWidth(){
	return document.body.offsetWidth;	
}

function getWebHeight(){
	return document.documentElement.clientHeight;
}

//简单的动画执行,让画面更舒适一些。
function sidebar(posH, time){
	if(typeof time == "undefined"){
		time = 10;
	}

	var pos = parseInt(mobileDebugDiv.style.top);
	var go;
	if (pos > posH) {
		go = -5;
	}else{
		go = 5;
	};

	var timer = setInterval(function(){
		pos = parseInt(mobileDebugDiv.style.top);

		if(pos == posH){
			clearInterval(timer);
		}else{
			mobileDebugDiv.style.top = parseInt(mobileDebugDiv.style.top) + go + "px";
		}
	}, time);
}

//配置
var mobileDebugConfig = {
	id:'mobile_debug',
	debug:true,//true,Chrome调试显示错误,false,不显示
	version:'1.0',
	Height:200,
	headHeight:30,
	infoHeight:170,
};

var mobileDiv = CDiv();
//mobileDiv.style.position = "";

//创建最外层div
var mobileDebugDiv = CDiv();
mobileDebugDiv.style.fontSize="12px";
mobileDebugDiv.id = mobileDebugConfig.id;
//mobileDebugDiv.style.overflow = "hidden";

var mobileDebugDivHead = CDiv();
mobileDebugDivHead.className = "head";
mobileDebugDivHead.style.color = "white";
mobileDebugDivHead.style.backgroundColor = "#000";
mobileDebugDivHead.style.width = mobileDebugConfig.headHeight + "px";
mobileDebugDivHead.style.height =  mobileDebugConfig.headHeight +"px";
mobileDebugDivHead.style.lineHeight = mobileDebugConfig.headHeight + "px";
mobileDebugDivHead.style.border = "0px";
mobileDebugDivHead.style.textAlign = "center";
mobileDebugDivHead.style.margin = "0 auto";
mobileDebugDivHead.style.lineHeight = "30px";
mobileDebugDivHead.style.cursor = "pointer";

mobileDebugDivHead.innerHTML = "↑";
mobileDebugDiv.appendChild(mobileDebugDivHead);



mobileDebugDivHead.onclick = function(){
	if (this.innerHTML == "↑") {
		this.innerHTML = "↓";
		mobileDebugDiv.style.top =  getWebHeight() - mobileDebugConfig.Height + "px";
		//console.log(parseInt(mobileDebugDiv.style.top));
		//sidebar(getWebHeight() - mobileDebugConfig.Height);
	}else{
		this.innerHTML = "↑";
		mobileDebugDiv.style.top =  getWebHeight() - mobileDebugConfig.headHeight + "px";
		//sidebar(getWebHeight() - mobileDebugConfig.headHeight);
	}
}

//信息显示
var mobileDebugDivInfo = CDiv();
mobileDebugDivInfo.style.height = "170px";
mobileDebugDivInfo.style.borderTop = "1px solid #E6E6E6";
mobileDebugDivInfo.style.overflowY = "scroll";
mobileDebugDivInfo.style.backgroundColor = "#fff";
mobileDebugDiv.appendChild(mobileDebugDivInfo);

mobileDiv.appendChild(mobileDebugDiv);


function handleError(errorMessage,scriptURI,lineNumber,columnNumber,error){
	//console.log(errorMessage,scriptURI,lineNumber,columnNumber,error);
	var info =  CDiv();
	info.className = "info";
	info.style.borderBottom = "1px solid #E6E6E6";
	info.style.height = "20px";
	info.style.lineHeight = "20px";


	var left = CDiv();
	left.style.float = "left";
	left.style.color = "#FF3737";
	left.innerHTML = errorMessage;
	info.appendChild(left);

	var right = CDiv();
	right.style.float = "right";

	var _t = getFileName(scriptURI);
	if (_t == "") {
		right.innerHTML = lineNumber;
	}else{
		right.innerHTML = getFileName(scriptURI) + ":" + lineNumber;
	}
	info.appendChild(right);
	mobileDebugDivInfo.appendChild(info);

	return 	!mobileDebugConfig.debug;
}

window.onerror = handleError;

function load(){

	mobileDebugDiv.style.position = "fixed";
	mobileDebugDiv.style.width = getWebWidth() + "px";
	mobileDebugDiv.style.left = "0px";
	mobileDebugDiv.style.top =  getWebHeight() - 30 + "px";

	var obj = Gid(mobileDebugConfig.id).getElementsByClassName('info');

	if (obj.length * 21 < mobileDebugConfig.infoHeight) {
		mobileDebugDivInfo.style.height = (obj.length * 21) + 'px';
		mobileDebugDivInfo.style.overflowY = "hidden";
		mobileDebugConfig.Height = (obj.length * 21) + mobileDebugConfig.headHeight+1;

	}
	//console.log("width:" + document.body.scrollWidth);
	//console.log("height:" + document.documentElement.clientHeight );
}




//模拟console.log(),测试数据
window.d = window.D = function(obj){
	var textShow = 'DEBUG:';
	for (i in arguments) {
		var temp = '';

		switch(typeof arguments[i]){
			case "string":
			case "boolean":
			case "number":temp += arguments[i];break;
			case "function":temp += "function";break;
			case "null":temp += "null";break;
			case "undefined": temp += "undefined";break;
			case "object": 
				if(is_array(arguments[i])){
					temp += "Array";
				}else if(is_null(arguments[i])){
					temp += "null";
				}else{
					temp += "Object";
				}
				//console.log(typeof arguments[i]);
				break;
		}

		if(i == 0){
			textShow += " " + temp;
		}else{
			textShow += ", " + temp;
		}
	};

	var info =  CDiv();
	info.className = "info";
	info.style.borderBottom = "1px solid #E6E6E6";
	info.style.height = "20px";
	info.style.lineHeight = "20px";

	var left = CDiv();
	left.style.float = "left";
	left.innerHTML = textShow;
	info.appendChild(left);

	var right = CDiv();
	right.style.float = "right";
	right.innerHTML = "time:" + new Date();
	info.appendChild(right);

	mobileDebugDivInfo.insertBefore(info, mobileDebugDivInfo.getElementsByClassName('info')[0]);
	if(Gid(mobileDebugConfig.id)){load();}	
}

window.onload = function(){
	document.body.appendChild(mobileDiv);
	load();
}
window.onresize = function(){load();}
})();
