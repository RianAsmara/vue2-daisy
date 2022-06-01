import Vuex from 'vuex';
import Vue from 'vue';
import article from './modules/article';
import auth from './modules/auth'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    article,
    auth
  }
});