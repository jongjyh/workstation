import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/components/layout.vue'
import courses from '@/views/course/courses.vue'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(VueRouter)

export const constantRoutes = [
  /*展示网站*/
  {
    path: '/',
    name: '作品展示',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/gallery/layout.vue'),
    meta: {
      title: '作品展示', //菜单名称
      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      icon: 'el-icon-trophy' //菜单左侧的icon图标
    },
    children:[
      {
        path: '',
        hidden:true,
        component: () => import(/* webpackChunkName: "about" */ '@/views/gallery/index.vue'),
        name: '展示首页',
        meta: {
          title:'选择课程',
          role: ['teacher','student','admin'],
          icon: "el-icon-success"
        },
      },
      {
        path: '/gallery/lesson/:id',
        name: 'lesson',
        hidden:true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/gallery/lesson.vue'),
        meta: {
          title: '作品展示', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      },
      {
        path: '/gallery/detail/:mode/:url?/:data?',
        name: 'projectDetail',
        hidden:true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/gallery/detail.vue'),
        meta: {
          title: '作品展示', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-info' //菜单左侧的icon图标
        }
      }
    ]


  },
  {
    path: '/index',
    hidden:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: layout,
    children:[
      {
        name: '主页',
        path:"",
        redirect: '/task/filter',
        meta: {
          title: '首页', //菜单名称
          roles: ['user', 'admin'], //当前菜单哪些角色可以看到
          icon: 'el-icon-s-home' //菜单左侧的icon图标
        }
      }
    ]
  },
    /*登录*/
  {
    path: '/login',
    name: 'Login',
    component: login,
    hidden: true
  },
    /*邀请和退出*/
  {
    path: '/join/:code',
    name: 'join',
    component:() => import('@/views/team/join.vue'),
    hidden: true
  },
  {
    path:'/404',
    name:'error404',
    component:()=>import("@/views/error/pageNotFound.vue"),
    hidden:true
  }

]

const router = new VueRouter({
  routes:constantRoutes,
  mode:'history',
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
      role: ['teacher','admin'],
      icon: "el-icon-setting"
    }, //页面需要的权限
    children: [{
        path: 'course',
        component: courses,
        name: '选择课程',
        meta: {
          title:'选择课程',
          role: ['teacher','admin'],
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
    //学生路由
  {
    path: '/show',
    component: layout,
    name: '作品管理',
    hidden:true,
    meta: {
      title:'作品管理',
      role: ['admin','student','teacher'],
      icon: "el-icon-s-custom"
    }, //页面需要的权限
    children: [
      {
        path: 'editor',
        component:()=>import("@/views/show/editor.vue"),
        name: 'editor',
        hidden:true,
      },
    ]
  },
  {
    path: '/task',
    component: layout,
    name: '实验管理',
     //页面需要的权限
      meta: {
          title:'实验管理',
          role: ['teacher','student','admin'],
          icon: "el-icon-s-order"
      },
    children: [
      {
        path: 'filter',
        component:()=>import("@/views/task/index.vue"),
        name: 'filter',
        meta: {
          title:'选择实验',
          role: ['student','teacher','admin'],//记得删除教师
          icon: "el-icon-monitor"
        }
      },{
            path: 'detail/:id',
            component:()=>import("@/views/task/detail.vue"),
            name: 'detail',
            hidden:true,
        },
    ]
  },
    //
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  }
];