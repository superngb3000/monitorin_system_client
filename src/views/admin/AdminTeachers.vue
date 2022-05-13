<template>
  <div>
    <form v-on:submit.prevent="addTeacher">
      <input type="text" v-model="personalityId" name="personality_id" placeholder="ID Личного дела"/>
      <input type="submit" class="btn btn-primary addTeacher" value="Создать преподавателя">
    </form>
    <form v-on:submit.prevent="findTeachers">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="number" v-model="personality_id" name="personalityId" placeholder="ID Личного дела"/>
      <input type="submit" class="btn btn-primary findTeachers" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">ID Личного дела</th>
<!--      <th scope="col">ID предметов</th>-->
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="teacher in this.teachers" v-bind:key="teacher.id">
        <td>{{teacher.id}}</td>
        <td>{{teacher.personality}}</td>
<!--        <td v-for="subject in this.subjects" v-bind:key="subject.id">-->
<!--          {{subject}}-->
<!--        </td>-->
        <td>
          <router-link type="submit" class="btn btn-primary showStudent" :to="'/admin/personalities/' + teacher.personality">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminTeachersService from "@/components/admin/services/AdminTeachersService";

export default {
  name: "adminTeachers",
  data() {
    return {
      id: null,
      personality_id: null,
      subject_id: null,
      teachers: [],
      personalityId: null,

    }
  },
  async mounted(){
    await this.getTeachers()
  },
  methods: {
    addTeacher: function (){
      AdminTeachersService.postTeacher(this.personalityId)
    },
    getTeachers: function (){
      AdminTeachersService.getTeachers()
          .then((response) => {
            this.teachers = response.data
          })
    },
    findTeachers: function () {
      AdminTeachersService.filterTeachers(this.id, this.personality_id, this.subject_id)
          .then((response) => {
            this.teachers = response.data
          })
    }
  }
}
</script>

<style scoped>

</style>