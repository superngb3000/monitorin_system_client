<template>
  <div id="app">
    <AppNav/>
    <router-view/>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import AppNav from "@/components/AppNav";

export default {
  components: {AppNav},
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
