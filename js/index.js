// 轮播图 start
//封装轮播图片数组
var imgs=[

	{"i":0,"img":"images/index_lunbo1.png","title":"省域文物大数据平台","dec":"Provincial Big Data Platform for Cultural Relics"},
	
	{"i":1,"img":"images/index_lunbo3.png","title":"文物三维扫描复仿制","dec":"3D Copies and Imitations of Cultural Relics"},
	{"i":2,"img":"images/index_lunbo2.png","title":"720度全景展示系统","dec":" 720 Degree Panoramic Displaying System"}
];
	var adv={
		WIDTH:0,//保存每张图片的宽度
		distance:0,//保存本次轮播的总距离
		DURA:500,//保存一次轮播的总时间
		STEPS:100,//保存一次轮播的总步数
		interval:0,//保存每一步轮播移动的时间间隔
		step:0,//保存每一步移动的步长
		timer:null,//保存当前正在播放的动画序号
		moved:0,//保存本次轮播已经移动的步数，moved==STEPS，说明移动完成
		WAIT:3000,//保存自动轮播之间的等待时间
	    canAuto:true,//标识能否自动轮播
		init:function(){
			this.WIDTH=parseInt($('.index_slider').width());
			this.updateView();//更新页面
			this.interval=this.DURA/this.STEPS;//计算每一步轮播移动的时间间隔
			var me=this;
			//为id为list的ul绑定鼠标进入事件为:
			$('#list').on('mouseover',function(e){
				var target=e.target;//获得目标元素target
				//如果target是li且class不是hover
				if(target.nodeName=="LI"&&target.className!="hover"){
					//获得id为list下class为hover的li的val，保存在before 
					var before=$("#list>.hover").val();
					//启动滚动动画，传入target的val-before作为参数
					me.move($(target).val()-before);
				}
			});
			//为class为index_slider的div绑定鼠标进入事件
			$(".index_slider").on('mouseover',function(){
				me.canAuto=false;
			});
			$(".index_slider").on('mouseout',function(){
				me.canAuto=true;
			});
			this.autoMove();//启用自动轮播
		},
		autoMove:function(){
			$(".index_slider_circle h3").addClass('on').removeClass('cur');
			$(".index_slider_circle p").addClass('on').removeClass('cur');
			var me=this;//留住this
			this.timer=setTimeout(function(){
			    if(me.canAuto){
					me.move(1);
				}else{

					me.autoMove();
				}	
			},this.WAIT);
		},
		move:function(n){
			//停止另一个动画，防止叠加
			clearTimeout(this.timer);
			this.timer=null;
			//清除id为lunbo的ul的left
			$('#lunbo').css('left','');
			//计算本次轮播的总距离: n*WIDTH
			this.distance=n*this.WIDTH;
			//计算每步的步长
			this.step=this.distance/this.STEPS;
			
			//如果右移:
			if(n<0){
		    //删除imgs结尾的-n个元素，拼接到imgs开头
		  
				imgs=imgs.splice(imgs.length+n,-n).concat(imgs);
				this.updateView();//更新页面
				//设置id为imgs的ul的left为n*WIDTH
				$("#lunbo").css('left',n*this.WIDTH+'px');

			}else{
				$(".index_slider_circle h3").addClass('cur');
				$(".index_slider_circle p").addClass('cur');
	
			}
			
			//启动一次性定时器，设置任务为moveStep，并且提前绑定this，设置时间间隔为interval
			this.timer=
			setTimeout(this.moveStep.bind(this,n),this.interval);
		},
		moveStep:function(n){//滚动一步
			//获得id为lunbo的ul的left,去单位，保存在left中
			var left=parseFloat($('#lunbo').css('left'));
			left-=this.step;//left-step
			$("#lunbo").css('left',left+'px');//设置id为lunbo的ul的left为left
			this.moved++;//moved+1
			if(this.moved<this.STEPS){//如果moved<STEPS
				//再次启动一次性定时器，设置任务为当前函数，并且提前绑定this，设置时间间隔为interval
				this.timer=
				setTimeout(arguments.callee.bind(this,n),this.interval);
			}else{//否则(本次滚动结束)
				this.timer=null;
			    this.moved=0;//moved归0 
			    $('#lunbo').css('left','');//清除id为lunbo的ul的left
			    if(n>0){//如果n>0，说明是左移
					//删除数组开头n个元素，追加到数组末尾
					imgs=imgs.concat(imgs.splice(0,n))
					this.updateView();//更新页面
				}
				this.autoMove();//立刻调用自动轮播
			}
		  },
		updateView:function(){//在每次滚动时，根据数组的内容更新两个ul
			//清除id为lunbo和list的内容
			$('#lunbo').html("");
			$('#list').html("");
			//动态生成轮播图片
			for(var i=0;i<imgs.length;i++){
				var img =new Image();
				img.src=imgs[i].img;
				var title = imgs[i].title;
				var dec = imgs[i].dec;
				$(".index_slider_circle h3").html(title).addClass('cur');
				$(".index_slider_circle p").html(dec).addClass('cur');
				$('#lunbo').append($('<li><img src="'+img.src+'"></li>'));
				$('#list').append($('<li value="'+i+'"></li>'));
			}
			//设置容器的宽度
			$("#lunbo").css('width',this.WIDTH*imgs.length+'px');
			//设置和imgs中第一个元素的i属性对应位置的li的class为hover
			$("#list>li")[imgs[0].i].className="hover";
		}
	}
	$(function(){
		/**页面加载执行轮播**/
		adv.init();
		$('.index_slider_left_btn').click(function(){
			adv.move(-1);
		});
		$('.index_slider_right_btn').click(function(){
			adv.move(1);
		})
	});
// 轮播图 end

$(function(){
	$(".index_slider2_right,.index_slider2_left").click(function(e){
			
			var rl="+",
				bl=$('.index_slider2_wrapper').is(":animated");
				
			(e.target.className=="index_slider2_right" && (rl="-")) || ($('.index_slider2_wrapper').position().left==0?$('.index_slider2_wrapper').css("left",'-2200px'):null)
			
			bl?null:$('.index_slider2_wrapper').animate({"left":rl+'='+1100+'px'},800,function(){
						$(this).position().left<=-2200?$('.index_slider2_wrapper').css("left",'0px'):null;
					});

	});
});
function pageXY(elem){
    var rect = elem.getBoundingClientRect();
    var scrollTop = window.scrollTop || (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop || 0;
    var scrollLeft = window.scrollLeft || (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft || 0;
 
    var html = document.documentElement || document.getElementsByTagName('html')[0];
 
    //修复ie 7 下的浏览器边框也被算在 boundingClientRect 内的 bug
    var deviation = html.getBoundingClientRect();
    //修复 ie8 返回 -2 的 bug
    deviation = { //FF 不允许修改返回的对象
        left:   deviation.left < 0 ? 0 : deviation.left,
        top:    deviation.top < 0 ? 0 : deviation.top
    };
 
    return {
        left:   rect.left + scrollLeft - deviation.left,
        top:    rect.top + scrollTop - deviation.top
    };
}
// 延迟加载图片
$(function(){
	var win_top;//窗口滚动坐标值的纵坐标
	var imgs=[];
	var img = document.getElementsByTagName('img');
	for(var j=0;j<img.length;j++){
		if(img[j].getAttribute('data-src')){
			imgs.push(img[j]);
			img[j].style.opacity=0;

			// console.info('第' +j+'张'+ (img[j].offsetTop))
		}
	}
	var win_height=document.documentElement.clientHeight;   //窗口的高度
	var scroll_fn = function(){
			win_top = document.body.scrollTop || document.documentElement.scrollTop;
			//如果窗口滚动坐标值的纵坐标+窗口的高度>=图片的文档坐标值的纵坐标，那么可以认为图片出现在屏幕中了
			
			for(var i=0; i<imgs.length; i++){
				if(win_top+win_height>= pageXY(imgs[i]).top+150){
					imgs[i].src = imgs[i].getAttribute('data-src');
					
					$(imgs[i]).animate({
						opacity: 1
					},600);
					
				}
			}
		}


		//当窗口一加载完毕，就调用
		scroll_fn();
		
		//当窗口滚动的时候，判断：如果图片出现在屏幕中，那么就将它的data-src属性给了它的src
		$(window).scroll(function(){
			scroll_fn();
			
		});
			$(".fl").on("mouseenter mouseleave",function(e){
		
		var obj={opa:1,bot:4};
		
			e.type=="mouseenter"?null:obj={opa:0,bot:-50};
			
			$(this).find("h3").animate({
				opacity:obj.opa,
				bottom:obj.bot+"px"
			},300)
		});
})

