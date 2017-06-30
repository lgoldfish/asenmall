<template>
	<div>
		 <div class="header">
       埃森商城
       <a href="javascript:history.back();">
         <div class="back">
           <img src="../assets/images/icon_back.png">
         </div>
       </a>
       <a href="/">
         <div class="home">
           <img src="../assets/images/icon_home.png" height="48" width="54">
         </div>
       </a>
     </div>
     <div class="banner">
       <img src="assets/images/banner.png">
       <div class="icon_banner">
         <img src="assets/images/icon_banner.png">
         <div class="line"></div>
         <span class="banner_title">{{formparent}}</span>
       </div>
     </div>
	</div>
</template>
<script >
	import "../assets/css/topnav.css"
  export default {
    name:"topnav",
    props:["formparent"]
  }
</script>