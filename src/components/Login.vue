<template>
  <div class="container mx-auto p-10 h-screen flex justify-center items-center">
    <form @submit.prevent="onsubmitedLoggedIn">
      <div class="form-control w-full  center">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input type="text" v-model="form.email" class="input w-full  mr-3">
      </div>
      <div class="form-control w-full ">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <label class="input-group">
          <input 
          :type="showPassword ? 'text' : 'password'" 
          v-model="form.password" 
          class="input input-bordered w-full"
          >
          <button class="btn" type="button" @click="onShowPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>

        </label>
      </div>
      <br>
      <br>
      <button type="submit" class="btn btn-primary btn-block">login</button>
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
      errors: null,
      showPassword: false,
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
    },
    onShowPassword() {
      this.showPassword = !this.showPassword;
    },

  },
};
</script>