<template>
  <div class="container mx-auto p-10">
    <button class="btn btn-secondary mr-5" @click="logout">Logout</button>
    <button class="btn btn-primary">
      <router-link class="nav-link" to="/list-items">Items</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "HelloComponent",
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>