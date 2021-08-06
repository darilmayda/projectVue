	const home = {
		template : '<div>Home</div>'
	}
	const NotFound = {
		template : '<div>Halaman tidak ditemukan</div>'
	}
	const about = {
		template : '<div>About</div>'
	}
	const detailKelas = {
		//$route.params.id, id disini sesuai drngan routes params pada routes
		template : `<div>
					<template v-if="detailData">
						<img :src="url_gambar(detailData.gambar)" width="200" />
						<h3>{{ detailData.judul }} : {{ $route.params.id }}</h3>
						<p>{{ detailData.deskripsi }} </p>
						<router-link to="/kelas">Kembali</router-link>
					</template>
					<p v-else>Kelas tidak ada</p>
					</div>`,
		data (){
			return {
				detailData : {}
			}
		},
		//fungsi lifecycle hooks
		created(){
			this.filterkelas()
		},
		methods : {
			filterkelas(){
				// localStorage
				// let datas = JSON.parse(localStorage.getItem("kelas"))
				// let id = this.$route.params.id
				// let item = datas.filter( k => k.id == id)
				// this.detailData = item[0]

				// firebase
				let id = this.$route.params.id
				let kelasDetailref = db.ref('kelas/' +id)
				kelasDetailref.on('value', (item) => {
					this.detailData = item.val()
				}) 
		
				
			},
			url_gambar: function(gambar){
				return gambar ? '../image/' +gambar : ''
			}
		}
	}
	const kelas = {
		props : ['items', 'input'],
		template :
		`<div>
			<h3>Form Input</h3>
			
			<form v-on:submit.prevent="submitkelas">
				<div class="Input-group"><input type="text" v-model="kelas.judul" placeholder="Nama Kelas">
				<div class="error" v-if="error.judul"><small>{{ error.judul}}</small></div>
				</div>
				<div class="Input-group">
					<label>Deskripsi : </label><br>
					<textarea v-model="kelas.deskripsi"></textarea>
					<div class="error" v-if="error.deskripsi"><small>{{ error.deskripsi}}</small></div>
				</div>
				<div class="Input-group">
				<img :src="previewimg" v-if="previewimg" width="50" />
					<label>Masukan Gambar : </label><br>
					<input type="file" ref="gambar"   v-on:change="upload"/>
				</div>
				<button type="submit">Submit</button>
			</form>
			<hr>
			<p>Daftar kelas {{items.length}}</p>
			<template v-if="items.length">
				<ul>
					<li v-for="(item, index) of items" >
					<img :src="'image/' + item.gambar" width="100" />
					<p>
						{{index + 1}} : {{item.judul}}

						<a href="" v-on:click.prevent="$emit('hapuskelas', item.id)">Delete</a>
						<router-link :to="'/kelas/' +item.id">Lihat Kelas</router-link>
					</p>
					
					</li>
				</ul>
			</template>
			<li v-else>kelas undefined</li>
		</div>`,
		data : function (){
			return {
				kelas:{
					judul : '',
					deskripsi :'',
					gambar :''

				},
				previewimg : '',
				//validation
				error : {
					judul : '',
					deskripsi :''
				}
			}
		},
		methods : {
			submitkelas : function(){
				this.error.judul = ''
				this.error.deskripsi = ''
				if (this.kelas.judul === '') {
					this.error.judul = 'Judul is required'
				}
				if (this.kelas.deskripsi === '') {
					this.error.deskripsi = 'Deskripsi is required'
				}
				if (this.kelas.judul && this.kelas.deskripsi)
				{
					const data = {
						id : uuidv4(),
						judul : this.kelas.judul,
						deskripsi : this.kelas.deskripsi,
						gambar : this.kelas.gambar
					}
					this.$emit('submitkelas', data)


					//agar seteleah submit pada input text nya hilang
					this.kelas.judul = ""
					this.kelas.deskripsi = ""
					this.kelas.gambar = ""
					this.previewimg = ""
					//ref digunakan untuk menghapus namagambar setelah submit
					this.$refs.gambar.value =""
				}
			},
			upload : function(event){
				const namagambar = event.target.files[0].name
				this.kelas.gambar = namagambar
				this.previewimg = URL.createObjectURL(event.target.files[0])
			},
			url_gambar(gambar){
				return '../image' + gambar
			}
		}
	}
	//mendaftakan komponen pada vuejs
	Vue.component('header-component',{
		// properti bisa lebih dari 1kali
		props : ['nama'],
		template: `
		<header>
			<template>
			  <div id="header" class="header">
			      <img src="../image/Vue.png" width="50" height="50">
			      <h3>Projek Daril Mayda</h3>
			      <div>
			        <button v-bind:class="{active:menu === 'home'}" v-on:click.prevent="gantimenu('home')" href="#">Home</button>
					<button v-bind:class="{active:menu === 'about'}" v-on:click.prevent="gantimenu('about')" href="#">About</button>
					<button v-bind:class="{active:menu === 'blog'}" v-on:click.prevent="gantimenu('blog')" href="#">Blog</button>
			      </div>
			      	
			  </div>
			  <p>{{'hello,' +nama}}</p>
			</template>
		</header>`,

		data : function(){
			return {
				pesan : 'Hello, component!',
				menu : 'home'
			}
		},
		methods : {
		    gantimenu : function(menux, event){
		  		this.menu = menux
		  	},
		}
	})


	Vue.component('footer-component', {
		//slot untuk memanggil text diantara tag
		template:
		`<footer id="footer">
		<slot></slot>
			
		</footer>`
	})