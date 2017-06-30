<template>
  <div id="app">
    <router-view></router-view>
    <div class="bottom_info">
      
            Copyright © 2013-2020 Essen Mall All Rights Reserved
            <br>
            技术支持：鼎联网络科技

    </div>

  </div>
</template>

<script>
import "./assets/css/reset.css"

export default {
  name: 'app'  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bottom_info {
    width: 250px;
    height: auto;
    bottom: 0.5rem;
    margin: 0px auto;
    font-size: 0.8rem;
    font-weight: lighter;
    line-height: 1.3rem;
    text-align: center;
    color: #999999;
    padding: 0.5rem;
}
</style>
