import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import List from '@/components/List'
import Detail from '@/components/Detail'
import Find from "@/components/Find"

Vue.use(Router)

export default new Router({
	mode:"history",
  base:__dirname,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path:"/list",
    	name:"List",
    	component:List
    },
    {
    	path:"/detail",
    	name:"Detail",
    	component:Detail
    },
    {
      path:"/find",
      name:"Find",
      component:Find
    }
  ]
})
