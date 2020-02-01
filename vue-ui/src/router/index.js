import Vue from 'vue'
import Router from 'vue-router'
import VideoList from '../components/VideoList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: VideoList },
    { path: '/about', name: 'about', component: VideoList },
    { path: '/resume', name: 'resume', component: VideoList },
    { path: '*', component: VideoList }
  ]
})
