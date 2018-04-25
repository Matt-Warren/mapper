import Vue from 'vue'
import Router from 'vue-router'
import MapView from '@/components/MapView'
import 'mdi/css/materialdesignicons.min.css'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapView',
      component: MapView
    }
  ]
})
