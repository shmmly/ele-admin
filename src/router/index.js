import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index/Index'

const UserInfo = () => import('@/components/userInfo/UserInfo')
const Resource = () => import('@/components/resource/Resource')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/userInfo',
          components: {
            pane: UserInfo
          }
        },
        {
          path: '/resource',
          components: {
            pane: Resource
          }
        }
      ]
    }
  ]
})
