<template>
  <div class="container mx-auto p-10">
    <button class="nav-link" @click="logout">Logout</button>
    <div class="divider"></div>
    <div v-for="article in allArticles" :key="article.id">
      <!-- <img src="{{ article.file_path }}" alt="{{ article.file_name }}" width="50%" height="auto"> -->
      <p>
        {{ article.items }}
      </p>
      <!-- {{ article.items.content }} -->
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "HelloComponent",
  methods: {
    ...mapActions(["fetchArticle"]),
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: mapGetters(["allArticles"]),
  created() {
    this.fetchArticle();
  }
};
</script>