<template >
  <div class="list" >
    <top-nav :formparent="listname"></top-nav>
    <search></search>
    <!-- {{details}} -->
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

<script>
import TabBottom from "./TabBottom.vue"
import TopNav from "./TopNav.vue"
import "../assets/css/reset.css"
import "../assets/css/list.css"
import Search from "./Search.vue" 
export default {
  name: 'list',
  data () {
    return {
      listname: '',
      details :[]
    }
  },
  components:{
    TopNav,
    TabBottom,
    Search
  },
  created(){
     // this.axios({
     //    method:'GET',
     //      url:'http://localhost:3000/list/'+this.$route.params.id,
     //      params: {
     //       fromvue:1
     //      }
     //    })
     //      .then((response) =>{
     //          // console.log(response.data)
     //          this.details=response.data;
     //          this.listname=response.data[0].id
     //    })
     //    .catch((error)=>{
     //        console.log(error)
     //    })
     // console.log("66666",this.$route.params.id)
     var url=this.siteUrl+"/list/"+this.$route.params.id+"?fromvue=1"
         $.ajax({
          url:url,
          type:"GET",
          success:(response)=>{
             console.log(response)


              this.details=response;
              this.listname=response[0].id
          },
          error:(xhr,status,error)=>{
             console.log(error)
          }
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
