<template>
  <div>
    <div class="topbar bg-dark py-2 px-3 text-light d-flex ai-center">
      <img src="../assets/logo.png" alt height="30" />
      <div class="px-2 flex-1">
        <div>王者荣耀</div>
        <div class="fs-xxs text-gary-1">团队成就更多</div>
      </div>
      <button class="btn px-2 py-2 bg-primary ai-end ">立即下载</button>
    </div>
    <div class="nav bg-primary d-flex py-2 jc-around ">
      <div class="navitem active pb-1">
         <router-link class="navlink text-white" to="/">首页</router-link>
      </div>
      <div class="navitem pb-1">
         <router-link class="navlink text-white" to="/">游戏中心</router-link>
      </div>
      <div class="navitem pb-1">
           <router-link class="navlink text-white" to="/">赛事中心</router-link>
      </div>
    </div>
    <router-view></router-view>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [{ name: "首页" }, { name: "攻略中心" }, { name: "赛事中心" }],
      isActive: false,
    };
  },
  methods: {
    navTab(index) {
      console.log(index);
      this.isActive = true;
    },
  },
};
</script>
<style lang="scss">

.topbar{
  position: sticky;
  top:0;
  z-index: 999;

}

</style>