<template>
	
	<div class="swiper-container">
	<!-- 轮播图片 -->
 		<div class="swiper-wrapper">
	    	<div class="swiper-slide">
	    		<img src="assets/images/201702280902007411463.jpg">
	    	</div>
	    	<div class="swiper-slide">
	    		<img src="assets/images/201702270950202546747.jpg">
	    	</div>
	    	<div class="swiper-slide">
	    		<img src="assets/images/201702280902212477931.jpg">
	    	</div>
		</div>
		<!-- 导航按钮 -->
		  <div class="swiper-pagination"></div>
		</div>
</template>
 <script>
 import "../../static/swiper.min.css"
 import "../../static/swiper.min.js"
 import "../assets/css/myswiper.css"
 	export default {
 		name:"swiper",
 		components:{},
 		 mounted () {
     console.log('挂载好了')
     var mySwiper = new Swiper('.swiper-container', {
       autoplay: 1000,
       direction: 'horizontal',
       loop: true,
       pagination: '.swiper-pagination',
       nextButton: '.swiper-button-next',
       prevButton: '.swiper-button-prev'
     })
     console.log(mySwiper)
   }

 	}
 </script>