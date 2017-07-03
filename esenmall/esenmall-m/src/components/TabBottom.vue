<template>  
<div class="bottom_tab">
      <div class="callme">   
        <template>
            <div >
                <mu-raised-button class="callme_button" label="联系我们" @click="open2"/>
                <mu-dialog :open="dialog2" title="联系我们" @close="close2">
                电话：0536-8572582
                <br>
                email: asenhj@163.com
                 <mu-flat-button slot="actions" primary @click="close2" label="关闭"/>
                </mu-dialog>
            </div>
        </template>
      </div>
      <div class="shopmall">
        
         <template>
            <div>
                <mu-raised-button class="callme_button" label="网上商城" @click="open"/>
                <mu-dialog :open="dialog" title="欢迎光临：" @close="close">
                您将进入网上商城页面！
                <mu-flat-button slot="actions" @click="close" primary label="取消"/>
                 <mu-flat-button slot="actions" primary @click="newWeb" label="确定"/>
                </mu-dialog>
            </div>
        </template>
      </div>
    </div>
</template>

<script >
  import "muse-ui/dist/muse-ui.js"
  export default  {
     data () {
    return {
      dialog: false,
      dialog2:false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    newWeb() {
      this.dialog = false
      window.open("http://shop.m.taobao.com/shop/shop_index.htm?spm=0.0.0.0&shop_id=115264735")
    },
    open2(){
       this.dialog2 = true
    },
     close2 () {
      this.dialog2 = false
    }
  }
}
</script>

<style scoped>

  .bottom_tab {
  width:360px;
  height: 50px;
  border-left: 1px solid #fff;
  border-top: 1px solid #fff;
  margin: 10px auto;
}
.bottom_tab div {
  width: 179px;
  height: 50px;
  border-right: 5px solid #fff;
  border-bottom: 1px solid #fff;
  float: left;
  line-height: 50px;
  font-size: 0.9rem;
  font-weight: lighter;
  color: #666666;
}
.callme_button {
  width: 100%;
  height:49px;
  font-size: 1.4rem;
  background: #b71b2c;
  color: #fff;
  font-weight: bold;
}
</style>