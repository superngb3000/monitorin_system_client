<template>
  <div>
<!--    <h1>Вы находитесь в панели администратора</h1>-->
    <nav class="navbar bg-light">
<!--      <a class="navbar-brand" href="/">Главная</a>-->
<!--      <a class="navbar-brand" href="/admin">Панель администратора</a>-->
      <router-link class="navbar-brand" to="/admin/personalities">Личные дела</router-link>
      <router-link class="navbar-brand" to="/admin/users">Пользователи</router-link>
      <router-link class="navbar-brand" to="/admin/teachers">Преподаватели</router-link>
      <router-link class="navbar-brand" to="/admin/students">Студенты</router-link>
      <router-link class="navbar-brand" to="/admin/groups">Группы</router-link>
      <router-link class="navbar-brand" to="/admin/subjects">Предметы</router-link>
      <!--      <a class="navbar-brand" href="/admin/events">Лекции и оцениваемые работы</a>-->
      <!--      <a class="navbar-brand" href="/actuator">Actuator</a>-->
    </nav>
  </div>
</template>

<script>
export default {
  name: "AdminNav"
}
</script>

<style scoped>

</style>