	//ROUTER KONFIGURASI
	const routes = [
	  { path: '/', component: home },
	  { path: '/about', component: about },
	  { path: '/kelas', component: kelas },

	  //ROUTES PARAMS
	  { 
	  	path: '/kelas/:id', 
	  	component: detailKelas
	  },
	  //url 404
	  { path : '*', component : NotFound}
	]

	const router = new VueRouter({
	  //history mode untuk merapikan url
	  mode: 'history',
	  routes // short for `routes: routes`
	})

	const member = {
		name : 'Daril Mayda',
		gambar : 'image/Vue.png',
	  	numbers : [1,2,3,4,5],
	  	// kelas : ["kelas A", "Kelas B", "Kelas C"],
	  	kelasbaru : " "

	}