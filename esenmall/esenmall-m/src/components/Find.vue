<template>
	<div>
	<top-nav :formparent="listname"></top-nav>
    <div class="search">
      <form>
        <input type="text" v-model="value" name="find" placeholder="搜索品牌/系列/型号">
      <img src="assets/images/icon_search.jpg" @click="getFind" >
      </form>
    </div>
		 <ul class="ul_list">
      <li v-for="detail in details">
        <router-link :to="{name:'Detail',params:{id:detail._id}}">
          <div class="prt_prc">
            <img :src="siteUrl+'/images/'+detail.mainpic">
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
	// import Search from "./Search.vue"
	import "../assets/css/reset.css"
	import "../assets/css/list.css"
	export default {
  name: 'detail',
  data () {
    return {
      listname: '查询页面',
      show:true,
      details:[],
      value:""
    }
  },
  components:{
    TopNav,
    TabBottom
  }
  ,
  created(){
     // this.axios({
     //    method:'GET',
     //      url:'http://localhost:3000/find/',
     //      params: {
     //       find:this.$route.params.id,
     //       fromvue:3
     //      }
     //    })
     //      .then((response) =>{
     //      	  console.log("response",response)
     //          this.details=response.data;
     //          this.show = false
     //    })
     //    .catch((error)=>{
     //        console.log(error)
     //    })
     var url=this.siteUrl+"/find?find="+this.$route.params.id+"&fromvue=3"
       $.ajax({
          url:url,
          type:"GET",
          success:(response)=>{
              this.details=response;
              this.show=false
          },
          error:(xhr,status,error)=>{
             console.log(error)
          }
        })

  },
  methods:{
    getFind:function(){
      var url=this.siteUrl+"/find?find="+this.value+"&fromvue=3"
       $.ajax({
          url:url,
          type:"GET",
          success:(response)=>{
              this.details=response;
              
              this.show=false
          },
          error:(xhr,status,error)=>{
             console.log(error)
          }
        })
    }
  }

}
</script>
<style scoped>
  .search {
  background-color: red;
    height: 4.1rem !important;
    background: #f5efef;
    position: relative;
    height: 3.8rem;
}
.search form input {
  position: absolute;
    width: 83%;
    height: 3rem;
    top: 0.55rem;
    left: 10px;
    border: 1px solid #d5d3d3;
    background: #fff;
    border-radius: 0.15rem;
    text-indent: 1rem;
    font-size: 1.3rem;
    font-weight: lighter;
    color: #CCCCCC;
    text-align: left;
}
.search form img{
  position: absolute;
    top: 0.7rem;
    right: 10px;
    width: 2.9rem;
    height: 2.9rem;
}
.banner_bottom img {
  width: 100%;
  height: auto;
}
</style>