import axios from 'axios';
import {
  removeHeaderToken,
  setHeaderToken
} from '../../helper/auth'
const state = {
  user: null,
  isLoggedIn: false,
};

const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  user(state) {
    return state.user
  },
};

const actions = {
  async login({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      axios.post(`https://e395-182-1-97-249.ap.ngrok.io/api/0.1/login`, data)
        .then(response => {
          const token = response.data.data.token
          localStorage.setItem('token', token)
          setHeaderToken(token)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          commit('resetUser')
          localStorage.removeItem('token')
          reject(error)
        })
    })
  },
  logout({
    commit
  }) {
    return new Promise((resolve) => {
      commit('resetUser')
      localStorage.removeItem('token')
      removeHeaderToken()
      resolve()
    })
  }
}

const mutations = {
  setUser: (state, data) => {
    state.user = data
    state.isLoggedIn = true
  },
  resetUser: (state) => {
    state.user = null
    state.isLoggedIn = false
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};