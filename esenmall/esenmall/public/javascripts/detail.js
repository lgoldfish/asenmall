$(function(){
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
            // console.log("e.clientY",e.clientY)
             zoom.style.display="block";

             // 求zoom的位置
             var left=Math.min(Math.max(x-50,0),300);
             var top=Math.min(Math.max(y-50,0),300);

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