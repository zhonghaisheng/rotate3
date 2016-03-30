define(function(require, exports) {
	require('rotate');
	require('ease');
	//这里写自定义的方法和属性
	var tapEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
	//转盘抽奖
	var prize = function() {
	    $(document).ready(function() {
	    	var rotateFunc = function(angle,text){
	    		//这里可以设置转动的对象：转盘/指针
				$('.active7-content .pan-box .pan').stopRotate();
				$(".active7-content .pan-box .pan").rotate({
					angle:0, 
					duration: 5000, 
					animateTo: angle,
					callback:function(){
						alert(text);
						$(".active7-content .pan-box .neddle").bind("click", roll);
					}
				}); 
			};
			var _ajaxRequest;
	        var roll = function() {
	            $(this).unbind("click", roll);
	            var angle = 0;
	            var prize_num = 0;//设置抽奖下标
	            if(!_ajaxRequest){
	            	_ajaxRequest = $.ajax({
	            		type:'post',
	            		url:'./js/prize.json',
	            		data:{},
	            		dataType:'json',
	            		success:function(result){
	            			prize_num = result.prizeIndex;
				            var tip_text,_angle = 360*3;
				            switch (prize_num) {
				            case 0:
				                alert("您的抽奖机会已用完，您可以完成任务获取更多抽奖机会.");
				                return false;
				                break;
				            case 2:
				                var $angle = _angle;
				                tip_text = '恭喜您获得姚仙签名海报';
				                break;
				            case 32:
				                var $angle = _angle-60;
				                tip_text = '恭喜您获得精美抱枕';
				                break;
				            case 62:
				                var $angle = _angle-180;
				                tip_text = '恭喜您获得竹筒花茶礼包';
				                break;
				            case 92:
				                var $angle = _angle-240;
				                tip_text = '恭喜您获得公仔';
				                break;
				            case 101:
				            	var $angle = _angle-120;
				            	tip_text = '谢谢参与';
				            	break;
				            case 102:
				            	var $angle = _angle-120;
				            	tip_text = '谢谢参与';
				            	break;
				            }
				            rotateFunc($angle,tip_text);//调用插件动画效果
				            _ajaxRequest = null;
				            //自定义动画效果
				            // var zhuan = setInterval(function() {
				            //     angle += 15;
				            //     $(".active6-content .pan-box .pan").rotate(angle);
				            //     if (angle >= $angle) {
				            //         clearInterval(zhuan);
				            //         alert(tip_text);
				            //         $(".coud_num").html($(".coud_num").html() - 1);
				            //         $(".active6-content .pan-box .neddle").bind("click", roll);
				            //     }
				            // },
				            // 30);
	            		}
	            	})
	            }
	        }
	        $(".active7-content .pan-box .neddle").bind("click", roll);
	    });
	}
	exports.init = function() {
		//这里调用自定义的方法和属性
		prize();//转盘抽奖
	}
})