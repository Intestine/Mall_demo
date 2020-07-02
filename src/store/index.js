import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	token:'',
	userName:''
  },
  mutations: {
	LOGIN: (state,token) => {
		state.token = token;
		localStorage.token = token
		
	},
	addUser:(state,userName)=>{
		state.userName = userName
		localStorage.userName = userName
		console.log( 'name:'+userName)
	},
	LOGOUT: (state) => {
		localStorage.removeItem('token');
		state.token = ''
		state.userName = ''
	}
  },
  actions: {
  },
  modules: {
  }
})
