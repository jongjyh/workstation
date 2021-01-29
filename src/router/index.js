import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/components/layout.vue'
import courses from '@/views/course/courses.vue'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '',
    name: '主页',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    children:[
      {
        path:"",
        component: () => import( '@/views/Home.vue'),
        meta: {
          title: '首页', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-s-home' //菜单左侧的icon图标
        }
      }
    ]
  }
  ,{
    path: '',
    name: '作品展示',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    children:[
      {
        path:"show",
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: '作品展示', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-s-home' //菜单左侧的icon图标
        }
      }
    ]
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: login,
    hidden: true
  },
  {
    path: '',
    name: 'About',
    component: layout,
    children:[
      {
        path:"about",
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: '关于我们', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      }
    ]
  },
  {
    path:'/404',
    name:'error404',
    component:()=>import("@/views/error/pageNotFound.vue"),
    hidden:true
  }

]

const router = new VueRouter({
  routes:constantRoutes
})

export default router
//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRoutes = [
  //教师路由
    //课程管理
  {
    path: '/courses',
    component: layout,
    name: '课程管理',
    meta: {
      title:'课程管理',
      role: ['teacher'],
      icon: "el-icon-s-custom"
    }, //页面需要的权限
    children: [{
        path: 'course',
        component: courses,
        name: '选择课程',
        meta: {
          title:'选择课程',
          role: ['teacher'],
          icon: "el-icon-success"
        },
       },{
      path: 'course',
      component: courses,
      name: '选择课程2',
      meta: {
        title:'第二选择',
        role: ['teacher'],
        icon: "el-icon-success"
        },
      },
      {
        path: 'courseInfo/:id',
        component:()=>import("@/views/course/courseInfo.vue"),
        name: 'courseInfo',
        hidden:true,
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
];