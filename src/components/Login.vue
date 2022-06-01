<template>
  <div class="container mx-auto p-10">
    <form @submit.prevent="onsubmitedLoggedIn">
      <input type="text" v-model="form.email">
      <br>
      <br>
      <input type="password" v-model="form.password">
      <br>
      <br>
      <button type="submit" class="btn">login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "LoginComponent",
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: null
    }
  },
  methods: {
    ...mapActions(["login"]),
    onsubmitedLoggedIn() {
      this.$store.dispatch('login', this.form)
        .then(response => {
          // push route ke halaman lain jika sukses.
          if (response) {
            this.$router.push({ name: 'Hello' })
            console.log('login sukses');
          }
        })
        .catch(error => {
          console.log('login gagal', error);
          this.error = error;
        })
    }
  },
};
</script>