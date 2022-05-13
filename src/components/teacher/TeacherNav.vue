<template>
  <div>
    <!--    <h1>Вы находитесь в панели преподавателя</h1>-->
    <nav class="navbar bg-light">
      <router-link class="navbar-brand" to="/teacher/subjects">Предметы</router-link>
      <router-link class="navbar-brand" to="/teacher/groups">Группы</router-link>
<!--      <router-link class="navbar-brand" to="/teacher/students">Студенты</router-link>-->
<!--      <router-link class="navbar-brand" to="/teacher/lessons">Посещаемость</router-link>-->
<!--      <router-link class="navbar-brand" to="/teacher/checkpoints">Оцениваемые работы</router-link>-->
    </nav>
  </div>
</template>

<script>
export default {
  name: "TeacherNav"
}
</script>

<style scoped>

</style>