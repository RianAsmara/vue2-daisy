<template>
  <div class="container mx-auto p-10 h-screen flex justify-center items-center">
    <div class="alert alert-danger" v-for="(error, index) in errors" :key="index">
      {{ error[0] }}
    </div>
    <form @submit.prevent="onsubmitedLoggedIn">
      <div class="form-control w-full  center">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input type="text" v-model="form.username" class="input input-bordered w-full">
      </div>
      <div class="form-control w-full ">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <label class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="form.password" class="input input-bordered w-full">
          <button class="btn btn-primary" type="button" @click="onShowPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </label>
      </div>
      <br>
      <br>
      <button type="submit" class="btn btn-primary btn-block" v-if="!isLoading">Login</button>
      <progress class="progress progress-primary" v-else></progress>
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
        username: '',
        password: ''
      },
      errors: null,
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    ...mapActions(["login"]),
    onsubmitedLoggedIn() {
      this.isLoading = true;
      this.$store.dispatch('login', this.form)
        .then(response => {
          console.log(response);
          this.$router.push({ name: 'dashboard' });
        })
        .catch(error => {
          this.isLoading = false;
          this.errors = error.response.data.errors
        })
    },
    onShowPassword() {
      this.showPassword = !this.showPassword;
    },

  },
};
</script>