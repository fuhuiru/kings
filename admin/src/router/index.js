import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoreEdit from "../views/CategoreEdit"
import CategoreList from "../views/CategoreList"
import ItemEdit from "../views/ItemEdit"
import ItemList from "../views/ItemList"
import HeroEdit from "../views/HeroEdit"
import HeroList from "../views/HeroList"
import ArticleEdit from "../views/ArticleEdit"
import ArticleList from "../views/ArticleList"
import AdEdit from "../views/AdEdit"
import AdList from "../views/AdList"
import AdminUserEdit from "../views/AdminUserEdit"
import AdminUserList from "../views/AdminUserList"
import Login from "../views/Login"


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        component: CategoreEdit,
      },
      {
        path: '/categories/edit/:id',
        component: CategoreEdit,
        props:true
      },
      {
        path: '/categories/list',
        component: CategoreList
      },
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props:true
      },
      {
        path: '/items/list',
        component: ItemList
      },
      {
        path: '/heroes/create',
        component: HeroEdit
      },
      {
        path: '/heroes/edit/:id',
        component: HeroEdit,
        props:true
      },
      {
        path: '/heroes/list',
        component: HeroList
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props:true
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props:true
      },
      {
        path: '/ads/list',
        component: AdList
      },
      {
        path: '/admin_users/create',
        component: AdminUserEdit
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props:true
      },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
    ]
  },
  {
    path:'/login',
    component:Login,
    meta:{isPublic:true}

  }
  
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to.meta.isPublic);
  console.log(localStorage.token);
  // if(!to.meta.isPublic && !localStorage.token){
  //   return next('/login')
  // }
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next();
})

export default router
