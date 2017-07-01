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
// 收藏板块

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
