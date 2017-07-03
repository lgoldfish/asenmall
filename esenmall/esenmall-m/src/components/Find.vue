<template>
	<div>
	<top-nav :formparent="listname"></top-nav>
	<search></search>
		 <ul class="ul_list">
      <li v-for="detail in details">
        <router-link :to="{name:'Detail',params:{id:detail._id}}">
          <div class="prt_prc">
            <img :src="'http://localhost:3000/images/'+detail.mainpic">
          </div>
          <div class="prt_next">
            <img src="assets/images/icon_list.png">
          </div>
          <span class="prt_title">{{detail.title}}</span>
          <span class="prt_font">品牌： {{detail.brand}}</span>
        </router-link>
      </li>
    </ul>
	<tab-bottom></tab-bottom>
	</div>
</template>
<script >
	import TopNav from "./TopNav.vue"
	import TabBottom from "./TabBottom.vue"
	import Search from "./Search.vue"
	import "../assets/css/reset.css"
	import "../assets/css/list.css"
	export default {
  name: 'detail',
  data () {
    return {
      listname: '查询页面',
      show:true,
      details:[]
    }
  },
  components:{
    TopNav,
    TabBottom,
    Search
  }
  ,
  created(){
     this.axios({
        method:'GET',
          url:'http://localhost:3000/find/',
          params: {
           find:this.$route.params.id,
           fromvue:3
          }
        })
          .then((response) =>{
          	  console.log("response",response)
              this.details=response.data;
              this.show = false
        })
        .catch((error)=>{
            console.log(error)
        })
  }
}
</script>