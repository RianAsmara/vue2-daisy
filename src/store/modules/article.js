import axios from 'axios';

const state = {
  articles: []
};

const getters = {
  allArticles: (state) => {
    return state.articles
  }
};

const actions = {
  async addArticle({
    commit
  }, title) {
    const response = await axios.post(`http://localhost:8888/item/create`, {
      title: title,
      completed: false
    })

    commit('addTodo', response.data.items)
  },
  async fetchArticle({
    commit
  }) {
    const response = await axios.get('http://localhost:8888/items');
    commit('setArticle', response);
  }
}

const mutations = {
  setArticle: (state, articles) => (state.articles = articles),
  addArticle: (state, newArticle) => state.todos.unshift(newArticle)

};

export default {
  state,
  getters,
  actions,
  mutations
};