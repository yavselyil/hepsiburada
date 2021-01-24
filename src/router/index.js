import Vue from 'vue'
import Router from 'vue-router'
import listPage from '../components/listPage.vue'
import addNewLink from '../components/addNewLink.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listPage',
      component: listPage
    },
    {
      path: '/create',
      name: 'create',
      component: addNewLink
    }
  ]
})
