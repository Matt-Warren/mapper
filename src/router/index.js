import Vue from 'vue'
import Router from 'vue-router'
import LocationList from '@/components/LocationList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LocationList',
      component: LocationList
    }
  ]
})
