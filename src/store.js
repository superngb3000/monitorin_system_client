import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    role: localStorage.getItem('role') || ''
  },

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user, role){
      state.status = 'success'
      state.token = token
      state.user = user
      state.role = role
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.role = ''
    },
  },

  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:8081/login', data: user, method: 'POST'})
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.userDtoModel
              const roles = resp.data.userDtoModel.roles
              localStorage.setItem('role', "ROLE_USER")
              for (let role of roles){
                if (role === "ROLE_ADMIN"){
                  localStorage.setItem('role', "ROLE_ADMIN")
                }
              }
              console.log(user)
              localStorage.setItem('token', token)
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              reject(err)
            })
      })
    },

    logout({commit}){
        // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },

  getters : {
    isAdmin: state => (state.role === "ROLE_ADMIN"),
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
