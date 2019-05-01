import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Flamechat from './views/Flamechat'
import Roadmap from './views/Company/Roadmap'
import Terms from './views/Company/Terms'
import Notice from './views/Company/Notice'
import Drawer from './views/Drawer'
import Hex from './views/Hex'
import Launchpad from './views/Launchpad'
import Scorecard from './views/Scorecard'
import Support from './views/Company/Support'
import News from './views/News'
import Satellite from './views/Satellite'
import Asteroid from './views/Asteroid'
import NetworkStatus from './views/Company/NetworkStatus'
import LatestMemes from './views/Latest/Memes'
import LatestVines from './views/Latest/Vines'
import Debate from './views/Debate'
import Inquiry from './views/Admin/Inquiry'
import Contracts from './views/Devs/Contracts'
import Databank from './views/Devs/Databank'
import Relay from './views/Devs/Relay'
import About from './views/Company/About'
import UserControl from './views/Admin/UserControl'
import LatestRocco from './views/Latest/Rocco'
import Media from './views/Media'
import Weather from './views/Weather'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
    {
      path: '/flame',
      name: 'Flamechat',
      component: Flamechat
		},
    {
      path: '/company/roadmap',
      name: 'Roadmap',
      component: Roadmap
    },
    {
      path: '/company/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/company/notice',
      name: 'Notice',
      component: Notice
		},
		{
			path: '/drawer',
			name: 'Drawer',
			component: Drawer
		},
		{
			path: '/hex',
			name: 'Hex',
			component: Hex
		},
		{
			path: '/launchpad',
			name: 'Launchpad',
			component: Launchpad
		},
		{
			path: '/scorecard',
			name: 'Scorecard',
			component: Scorecard
		},
		{
			path: '/company/support',
			name: 'Support',
			component: Support
		},
		{
			path: '/paradox',
			name: 'News',
			component: News
		},
		{
			path: '/satellite',
			name: 'Satellite',
			component: Satellite
		},
		{
			path: '/asteroid',
			name: 'Asteroid',
			component: Asteroid
		},
		{
			path: '/company/status',
			name: 'NetworkStatus',
			component: NetworkStatus
		},
		{
			path:'*',
			redirect: '/home'
		},
		{
			path: '/latest/memes',
			name: 'LatestMemes',
			component: LatestMemes
		},
		{
			path: '/latest/vines',
			name: 'LatestVines',
			component: LatestVines
		},
		{
			path: '/debate',
			name: 'Debate',
			component: Debate
		},
		{
			path: '/admin/inquiry',
			name: 'Inquiry',
			component: Inquiry
		},
		{
			path: '/dev/contracts',
			name: 'Contracts',
			component: Contracts
		},
		{
			path: '/dev/relay',
			name: 'Relay',
			component: Relay
		},
		{
			path: '/dev/databank',
			name: 'Databank',
			component: Databank
		},
		{
			path: '/company/about',
			name: 'About',
			component: About
		},
		{
			path: '/admin/users',
			name: 'UserControl',
			component: UserControl
		},
		{
			path: '/latest/rocco',
			name: 'LatestRocco',
			component: LatestRocco
		},
		{
			path: '/media',
			name: 'Media',
			component: Media
		},
		{
			path: '/weather',
			name: 'Weather',
			component: Weather
		}
  ]
})
