<template>
  <div>
    <nav class="navbar bg-light">
      <router-link class="navbar-brand" to="/">Главная</router-link>
      <router-link class="navbar-brand" v-if="isAdmin" to="/admin">Панель администратора</router-link>
      <router-link class="navbar-brand" v-if="isLoggedIn" to="/teacher">Панель преподавателя</router-link>
      <router-link class="navbar-brand" v-if="!isLoggedIn" to="/login">Войти</router-link>
      <span v-else><a @click="logout">Выйти</a></span>
    </nav>
    <span></span>
  </div>
</template>

<script>
export default {
  name: "AppNav",

  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn },
    isAdmin : function (){ return this.$store.getters.isAdmin }
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