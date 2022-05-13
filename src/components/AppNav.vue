<template>
  <div>
    <nav class="navbar bg-light">
      <router-link class="navbar-brand" to="/">Главная</router-link>
      <router-link class="navbar-brand" to="/admin">Панель администратора</router-link>
      <router-link class="navbar-brand" to="/teacher">Панель преподавателя</router-link>
      <router-link class="navbar-brand" v-if="!isLoggedIn" to="/login">Войти</router-link>
      <span v-if="isLoggedIn"><a @click="logout">Выйти</a></span>
    </nav>
    <span></span>
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "AppNav",

  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },

  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },

  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  }
}
</script>

<style scoped>

</style>