import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Flamechat from './views/Flamechat'
import Roadmap from './views/Company/Roadmap'
import Terms from './views/Company/Terms'
import Notice from './views/Company/Notice'
import Drawer from './views/Drawer'
import Scorecard from './views/Scorecard'
import Support from './views/Company/Support'
import News from './views/News'
import Satellite from './views/Satellite'
import Asteroid from './views/Asteroid'
import NetworkStatus from './views/Company/NetworkStatus'
import LatestMemes from './views/Latest/Memes'
import LatestVines from './views/Latest/Vines'
import Contracts from './views/Devs/Contracts'
import Databank from './views/Devs/Databank'
import Relay from './views/Devs/Relay'
import About from './views/Company/About'
import Media from './views/Media'
import PageNotFound from './views/404'
import Weather from './views/Weather'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
			// name: 'Home',
			// component: Home
		},
		{
			path: '*',
			redirect: '/'
		}
		// {
		// 	path: '/home',
		// 	name: 'Home',
		// 	component: Home
		// },
    // {
    //   path: '/flame',
    //   name: 'Flamechat',
    //   component: Flamechat
		// },
    // {
    //   path: '/company/roadmap',
    //   name: 'Roadmap',
    //   component: Roadmap
    // },
    // {
    //   path: '/company/terms',
    //   name: 'Terms',
    //   component: Terms
    // },
    // {
    //   path: '/company/notice',
    //   name: 'Notice',
    //   component: Notice
		// },
		// {
		// 	path: '/drawer',
		// 	name: 'Drawer',
		// 	component: Drawer
		// },
		// {
		// 	path: '/scorecard',
		// 	name: 'Scorecard',
		// 	component: Scorecard
		// },
		// {
		// 	path: '/company/support',
		// 	name: 'Support',
		// 	component: Support
		// },
		// {
		// 	path: '/paradox',
		// 	name: 'News',
		// 	component: News
		// },
		// {
		// 	path: '/satellite',
		// 	name: 'Satellite',
		// 	component: Satellite
		// },
		// {
		// 	path: '/asteroid',
		// 	name: 'Asteroid',
		// 	component: Asteroid
		// },
		// {
		// 	path: '/company/status',
		// 	name: 'NetworkStatus',
		// 	component: NetworkStatus
		// },
		// {
		// 	path:'*',
		// 	name: 'PageNotFound',
		// 	component: PageNotFound
		// },
		// {
		// 	path: '/latest/memes',
		// 	name: 'LatestMemes',
		// 	component: LatestMemes
		// },
		// {
		// 	path: '/latest/vines',
		// 	name: 'LatestVines',
		// 	component: LatestVines
		// },
		// {
		// 	path: '/dev/contracts',
		// 	name: 'Contracts',
		// 	component: Contracts
		// },
		// {
		// 	path: '/dev/relay',
		// 	name: 'Relay',
		// 	component: Relay
		// },
		// {
		// 	path: '/dev/databank',
		// 	name: 'Databank',
		// 	component: Databank
		// },
		// {
		// 	path: '/company/about',
		// 	name: 'About',
		// 	component: About
		// },
		// {
		// 	path: '/media',
		// 	name: 'Media',
		// 	component: Media
		// },
		// {
		// 	path: '/weather',
		// 	name: 'Weather',
		// 	component: Weather
		// }
  ]
})
