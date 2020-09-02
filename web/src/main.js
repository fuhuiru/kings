import Vue from 'vue'
import App from './App.vue'
import "./style.scss"
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
 
import 'swiper/dist/css/swiper.css'
import "./assets/iconfont/iconfont.css"

import cardList from "./components/cardList.vue"
Vue.component("cardList",cardList)
 
 
Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
