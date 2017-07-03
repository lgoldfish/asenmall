<template>
  <div>
   <top-nav :formparent="listname"></top-nav>
  <search></search>
  <div class="detail">
    <div class="prt_info">
      <div class="prt_info_title">
        {{detail.title}}
      </div>
      <div class="prt_info_mainpic">
        <img v-if="!show" :src="'http://localhost:3000/images/'+detail.mainpic">
      </div>
    </div>
    <div class="prt_data">
      <span class="prt_data_title">产品价格</span>
      <span class="prt_data_price">销售价：<strong>￥{{detail.price}}</strong></span>
    </div>
    <div class="prt_profile">
      <span class="prt_profile_title">产品概述</span>
      <div class="prt_profile_content">
        {{detail.describe}}
        <ul>
          <li v-for="image in detail.images">
            <img :src="'http://localhost:3000/images/'+image">
          </li>
        </ul>
      </div>
    </div>
  </div>
   <tab-bottom></tab-bottom>
  </div>
</template>

<script>
import TopNav from "./TopNav.vue"
import Search from "./Search.vue" 
import TabBottom from "./TabBottom.vue"
import "../assets/css/detail.css"
export default {
  name: 'detail',
  data () {
    return {
      listname: '',
      detail:{},
      show:true
    }
  },
  components:{
    TopNav,
    TabBottom,
     Search
  },
  created(){
     this.axios({
        method:'GET',
          url:'http://localhost:3000/detail/'+this.$route.params.id,
          params: {
           fromvue:2
          }
        })
          .then((response) =>{
              console.log(response.data)
              this.detail=response.data;
              this.listname=response.data.id;
              this.show = false
        })
        .catch((error)=>{
            console.log(error)
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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