<template>
    <div class="newCard bg-white p-3 mt-3">
      <div class="cardHeader d-flex flex-wrap pb-3">
        <i class="iconfont icon-news"></i>
        <div class="flex-1 ml-2 fs-xl">新闻资讯</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="newCate">
        <div class="newCateTitle d-flex jc-between my-3">
          <div class="border-bottom active pt-1">赛事</div>
          <div class="border-bottom pt-1">赛事</div>
          <div class="border-bottom pt-1">赛事</div>
          <div class="border-bottom pt-1">赛事</div>
          <div class="border-bottom pt-1">赛事</div>
        </div>
        <div class="newcateList">
          <swiper>
            <swiper-slide v-for="i in 5" :key="i">
              <div  class="items d-flex flex-wrap" v-for="i in 6" :key="i">
                <div>公告</div>
                <div class="flex-1">公告</div>
                <div>公告</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    
}
</script>