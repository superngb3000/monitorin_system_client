<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Авторизация</h1>
      <label>Имя пользователя</label>
      <input required v-model="username" type="text" placeholder="Логин"/>

      <label>Пароль</label>
      <input required v-model="password" type="password" placeholder="Пароль"/>
      <hr/>
      <button class="btn btn-primary" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
// import bcrypt from 'bcryptjs';
export default {
  name: "LoginPage",
  data(){
    return {
      username : "",
      password : "",
    }
  },
  methods: {
    login: function () {
      // const salt = bcrypt.genSaltSync(10)
      let username = this.username
      // let password = bcrypt.hashSync(this.password, salt)
      let password = this.password
      this.$store.dispatch('login', {username, password})
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>