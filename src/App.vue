<template>
  <div id="app">
    <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
    </a-layout-header>
    <a-layout-content :style="{ marginTop: '64px' }">
      <div :style="{ background: '#fff', minHeight: '380px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer class="footer">
      Developed By Yavuz Selim Yılmaz
    </a-layout-footer>
  </a-layout>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
<style scoped>
.footer {
  position: fixed;
    bottom: 0;
    width: 100%;

}
/deep/ .ant-layout-header {

    background: white;
}

/deep/ .ant-card-head {
      /* background: #ff6000; */
    color: #ff6000;
    font-weight: 700 !important;   
}
/deep/ .ant-btn-primary {
   background-color: #ff6000 !important;
   border-color:  #ff6000;
}

/deep/ .ant-btn-primary:hover {
   background-color: #ff6000;
   border-color:  #ff6000;
}

</style>