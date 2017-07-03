<template>
	   <div class="search">
      <form>
        <input type="text" v-model="value" name="find" placeholder="搜索品牌/系列/型号">
        <router-link :to="{name:'Find',params:{id:value}}" ><img src="assets/images/icon_search.jpg" ></router-link>
      </form>
    </div>
</template>
<script >
	import "../assets/css/reset.css"
	export default {
		name:"search",
		data(){
			return {
				value:""
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
.banner_bottom a img {
	width: 100%;
	height: auto;
}
</style>