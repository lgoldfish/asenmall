<template>
  <div class="home">
  <swiper></swiper>
    <search></search>
    <div class="banner_bottom">
      <a href="javascript:void(0);" onclick="window.open('http://shop.m.taobao.com/shop/shop_index.htm?spm=0.0.0.0&shop_id=115264735#list?catId=1035601667&catTxt=%E6%B7%B1%E5%9C%B3%E5%9B%BA%E9%82%A6%E7%84%8A%E6%9C%BA')" style="color: #B71B2C;">
        <img src="assets/images/moneybox.jpg" height="350" width="1225">
      </a>
    </div>
    <div class="menu">
     <ul>
       <li v-for="list in lists">
         <router-link :to="{name:'List',params:{id:list.id}}">
             <div class="show_icon_img_1">
                <img :src="list.img_url">
             </div>
           <div class="show_font">
             {{list.title}}
           </div>
         </router-link>
       </li>
     </ul>
    </div>
    <tab-bottom></tab-bottom>
  </div>

</template>

<script>
import swiper from "./Swiper.vue"
import TabBottom from "./TabBottom.vue"
import "../assets/css/home.css"
import Search from "./Search.vue" 
export default {
  name: 'home',
  data () {
    return {
      msg: 'Home 页面',
      lists:[
      {id:"电焊机",img_url:'assets/images/01.png',title:"电焊机"},
      {id:"辅具类",img_url:'assets/images/02.png',title:"辅具类"},
      {id:"焊接配件",img_url:'assets/images/03.png',title:"焊接配件"},
      {id:"焊接设备",img_url:'assets/images/04.png',title:"焊接设备"},
      {id:"切割设备",img_url:'assets/images/05.png',title:"切割设备"},
      {id:"切割配件",img_url:'assets/images/06.png',title:"切割配件"},
      {id:"劳动保护",img_url:'assets/images/07.png',title:"劳动保护"},
      {id:"工业五金",img_url:'assets/images/08.png',title:"工业五金"},
      {id:"焊材",img_url:'assets/images/09.png',title:"焊材"}

      ]
    }
  },
   components:{
    swiper,
    TabBottom,
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
