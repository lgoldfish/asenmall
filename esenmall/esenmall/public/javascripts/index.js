$(function() {

    // 主导航二级菜单
    $(".nav_left > li").mouseenter(function() {
        $(".nav_left_show > li").eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
    })
    $(".nav_left ").mouseleave(function() {
        $(".nav_left_show>li").css("display", "none")
    })
    $(".nav_left_show>li").mouseenter(function() {
        $(this).css("display", "block")
    }).mouseleave(function() {
        $(this).css("display", "none")
    })


// 来自王明晟媒体板块、收藏板块
$('.wmsLunbonumber ul li').each(function(i,ele){
        $(ele).mouseenter(function(){
            $(this).css('background-color','red').siblings().css('background-color','#333');
            // console.log(300*i+'px');
            
            clearInterval(a);
            $('.wmsLunbo ul').stop().animate({'right':300*i+'px'},1500)
            

        });
    $('.wmsLunbo').mouseenter(function(){
        clearInterval(a);
    })
    })


    var i=1;
    var a=setInterval(function(){
        $('.wmsLunbo ul').stop().animate({'right':300*i+'px'},1500);
        $('.wmsLunbonumber ul li').eq(i).css('background-color','red').siblings().css('background-color','#333');
        i++;
        if(i>2){
            i=0
        }       
    },2000);


    $('.wmsMedialeft').mouseleave(function(){
        var a=setInterval(function(){
        
        $('.wmsLunbo ul').stop().animate({'right':300*i+'px'},1500);
        $('.wmsLunbonumber ul li').eq(i).css('background-color','red').siblings().css('background-color','#333');
        i++;
        if(i>2){
            i=0
        }
    },2000);
        $('.wmsLunbo').mouseenter(function(){
            clearInterval(a)
        })
    });


       $("#favorites").click(function(){
           var ctrl=(navigator.userAgent.toLowerCase()).indexOf('mac')!=-1?'Command/Cmd': 'CTRL';
           if(document.all){
               window.external.addFavorite('http://blog.csdn.net/yilanyoumeng3', '前端秋秋');
               }
               else if(window.sidebar){
                   window.sidebar.addPanel('前端秋秋', 'http://blog.csdn.net/yilanyoumeng3', "");
                   }
                   else{ alert('您可以通过快捷键' + ctrl + ' + D 加入到收藏夹');}
           })

// 来自王明晟 楼梯导航，在线咨询
$(window).scroll(function(){
    // console.log($(window).scrollTop())
   if($(window).scrollTop()>1176 &&$(window).scrollTop()<5457){
    $('.wmsFloor ').css("display","block")
   }else {
        $('.wmsFloor ').css("display","none")
   }
    var a=$(window).scrollTop();
    // console.log(a)
    if(1176<a && a<1580){
        $('.wmsFloor li').eq(0).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(1580<=a && a<1960){
        
        $('.wmsFloor li').eq(1).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(1960<a && a<2487){
        
        $('.wmsFloor li').eq(2).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(2487<a && a<2879){
        
        $('.wmsFloor li').eq(3).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(2879<a && a<3271){
        
        $('.wmsFloor li').eq(4).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(3271<a && a<3792){
        
        $('.wmsFloor li').eq(5).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(3792<a && a<4183){
        
        $('.wmsFloor li').eq(6).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(4183<a && a<4573){
        
        $('.wmsFloor li').eq(7).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(4573<a && a<5094){
        
        $('.wmsFloor li').eq(8).css('color','#b81c2b').siblings().css('color','#858685')
    }else if(5094<a){
        
        $('.wmsFloor li').eq(9).css('color','#b81c2b').siblings().css('color','#858685')
    }
})

    $('.wmsFloor li').each(function(i,ele){
        $(ele).click(function(){
            var i=$(ele).index();
            var a='#wms'+(i+1);
            // console.log(a);
            $('body,html').animate({scrollTop:$(a).offset().top},500);

        })
    });

    $('.wmsContact').click(function(){
        $('.wmsOpen').animate({'right':'0'},500)
    })
    
    $('.wmsOpen').click(function(){
        $('.wmsOpen').animate({'right':'-200px'},500)
    })

    // 回到顶部按钮
$("#topcontrol").click(function() {
   $('html body').animate({scrollTop: 0 }, 700)
  })

// 时钟特效-----------------
function startTime() {
    var today = new Date()
    // console.log(today)
    var h = today.getHours()
    var m = today.getMinutes()
    var s = today.getSeconds()
    var d = today.getDate()
    var mon = today.getMonth()+1
    var y = today.getFullYear()
    var w = today.getDay()
    m = checkTime(m)
    s = checkTime(s)
    mon = checkTime(mon)
    d = checkTime(d)
    switch (w) {
        case 1:
            w = "一";
            break;
        case 2:
            w = "二";
            break;
        case 3:
            w = "三";
            break;
        case 4:
            w = "四";
            break;
        case 5:
            w = "五";
            break;
        case 6:
            w = "六";
            break;
        case 0:
            w = "日";
            break;
    }
    document.getElementById('txt1').innerHTML = h + ":" + m
    document.getElementById('txt2').innerHTML = s
    document.getElementById('txt3').innerHTML = "星期" + w
    document.getElementById('txt4').innerHTML = y + "年" + mon + "月" + d + "日"
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
startTime()
setInterval(startTime,1000)
// ------------------------


// 左侧手拉面板--------------------------------------

$('.wmsDrag').on('mousedown', function(e) {


        $(document).on('mousemove.drag', function(e) {
            e.preventDefault();
            $('.wmsLefthidden').offset({
                left: e.pageX - 325
            });
        });

        $(document).on('mouseup', function(e) {
            $(document).off('mousemove.drag');
            $('.wmsLefthidden').stop().animate({
                'top': '150px',
                'left': document.body.clientWidth/2 -300 ,
                'width': '600px',
                "border-radius":"40px",
            }, 500);
            $(document).off('mouseup')





            setTimeout(function() {
                $('.wmsDrag').css('display', 'none');
                $('.wmsDrag2').css('display', 'block');
                $(".wmsText").css("display", "none")
                $(".showUs").css("display", "block")

            }, 500)
        });

    });


    $('.wmsDrag2').click(function() {
        $(".showUs").css("display", "none")
        $(".wmsText").css("display", "block")
        $('.wmsLefthidden').stop().animate({
            'top': '150px',
            'left': '-300px',
            'width': '300px',
            "border-radius":"0"
        }, 500);
        setTimeout(function() {
            $('.wmsDrag').css('display', 'block');
            $('.wmsDrag2').css('display', 'none');
            $('.wmsText').text('关于我们');
            // $('.wmsText').css('width', '300px')


        }, 500)
    });
})
