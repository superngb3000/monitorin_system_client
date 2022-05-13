<template>
  <div>
    <TeacherNav/>
    <router-view/>
  </div>
</template>

<script>
import TeacherNav from "@/components/teacher/TeacherNav";
export default {
  name: "TeacherPage",
  components: {TeacherNav}
}
</script>

<style scoped>

</style>