<template>
  <div class="app" id="app">
    <transition name="van-fade">
      <keep-alive>
        <router-view v-show="show" v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
      </keep-alive>
    </transition>
    <transition name="van-fade">
      <router-view v-show="show" v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        show: true
      }
    },
    watch: {
      $route() {
        this.show = false
        this.show = true
      }
    }
  }
</script>
<style>
  html {
    background: #ededed;
  }
  #app {
    display: flex;
    flex-direction: column;
    max-width: 475px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
    min-height: 100vh;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
