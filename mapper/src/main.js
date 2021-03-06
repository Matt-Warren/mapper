// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueClip from 'vue-clip'
import Viewer from 'v-viewer'
import 'vuetify/dist/vuetify.min.css'
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#b71c1c',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(VueClip)
Vue.use(Viewer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
