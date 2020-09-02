 <template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/turn1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/turn1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/turn1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/turn1.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 text-center pt-3">
      <div class="d-flex flex-wrap">
        <div class="navitem mb-3" v-for="i in 10" :key="i">
          <i class="sprite sprite-news"></i>
          <div class="item">爆料站</div>
        </div>
      </div>
      <div class="toup bg-light py-2">
        <i class="sprite sprite-up mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <cardList></cardList>

    <i class="iconfont icon-news"></i>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
      },
    };
  },
};
</script>

<style lang="scss">
@import "../varibales.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 25%;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .navitem {
    border-right: 1px solid $border-color;
    width: 25%;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
.newCard {
  .cardHeader {
    border-bottom: 1px solid map-get($colors, "light-1");
  }
}
.toup {
  display: block;
}

.border-bottom {
  border-bottom: 1px solid transparent;
}
.border-bottom-active {
  border-bottom-color: map-get($colors, "primary");
}
.newCateTitle {
  .border-bottom {
    border-bottom: 2px solid transparent;
    &.active {
      border-bottom-color: map-get($colors, "primary");
      color: map-get($colors, "primary");
    }
  }
}
</style>