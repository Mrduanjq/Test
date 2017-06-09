$(".ti_header_nav").on("mouseenter mouseleave","li",function(e){
	e.stopPropagation();
	
	var bgDiv=$(this).children("div"),
		bgHei=0;
	
	bgDiv.stop(true);

	e.type=="mouseenter" && (bgHei=73);
	
	bgDiv.animate({height:bgHei+"px"},200);
		
});


var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement('style');
var metaEl = document.querySelector('meta[name="viewport"]');

dpr = window.devicePixelRatio || 1;
if(dpr<3){
	dpr=3;
}
rem = docEl.clientWidth * dpr / 10;
scale = (1 / dpr).toFixed(1);


// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute('content', 'width=' + Math.round(docEl.clientWidth*dpr) + ',height='+ Math.round(docEl.clientHeight/dpr)+',initial-scale=' + scale + ',maximum-scale=1, minimum-scale=' + scale + ',user-scalable=yes');

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl);
//		fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem;
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem;
};

window.dpr = dpr;
window.rem = rem;
