$(function() {
    $(".show01").mouseenter(function() {
        console.log("666")
        $(".nav_left").css({ "display": "block" })
    })

    // 主导航二级菜单
    $(".nav_left > li").mouseenter(function() {
        console.log("000000")
        $(".nav_left_show > li").eq($(this).index()).css('display', 'block').siblings().css('display', 'none')
    })
    $(".nav_left ").mouseleave(function() {
        $(".nav_left_show>li").css("display", "none")
        $(".nav_left").css("display", "none")
    })
    $(".nav_left_show>li").mouseenter(function() {
            $(this).css("display", "block")
            $(".nav_left").css("display", "block")
        }).mouseleave(function() {
            $(this).css("display", "none")
            $(".nav_left").css("display", "none")
        })
        // 手机淘宝
    $('.wmsContact').click(function() {
        $('.wmsOpen').animate({ 'right': '0' }, 500)
    })

    $('.wmsOpen').click(function() {
        $('.wmsOpen').animate({ 'right': '-200px' }, 500)
    })

    // 回到顶部按钮
    $("#topcontrol").click(function() {
        $('html body').animate({ scrollTop: 0 }, 700)
    })


    // 放大镜功能-----------------------------
   var box=document.getElementById('box');
          var bigbox=document.getElementById('bigbox');

          box.onmousemove=function(en){

             var e=en||window.event;

             bigbox.style.display="block";

             bigbox.style.left=box.offsetLeft+box.offsetWidth+5+'px';
             bigbox.style.top=box.offsetTop+'px';

             // 获取鼠标在小图上的位置
             var x=e.clientX-box.offsetLeft;
             var y=e.clientY+document.body.scrollTop-box.offsetTop;
            console.log("e.clientY",e.clientY)
             zoom.style.display="block";

             // 求zoom的位置
             var left=Math.min(Math.max(x-50,0),300);
             var top=Math.min(Math.max(y-50,0),200);

              console.log("top",top)
             console.log("left",left)

             zoom.style.left=left+'px';
             zoom.style.top=top+'px';

             bigbox.scrollLeft=left*4;
             bigbox.scrollTop=top*4;
        }
      
        box.onmouseout=function(){   
            bigbox.style.display="none";
            zoom.style.display="none";
          }
// ------------------------------------------

})
