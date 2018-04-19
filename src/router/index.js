import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import "mdi/css/materialdesignicons.min.css"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: Map
    }
  ]
})
