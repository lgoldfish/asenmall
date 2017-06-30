<template>
  <div class="home">
  <swiper></swiper>
    <div class="search">
      <form>
        <input type="text" name="" placeholder="搜索品牌/系列/型号">
        <img src="assets/images/icon_search.jpg" >
      </form>
    </div>
    <div class="banner_bottom">
      <a href="">
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
// console.log(swiper)
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
    TabBottom
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
