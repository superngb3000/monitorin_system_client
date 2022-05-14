<template>
  <div>
    <form v-on:submit.prevent="addStudent">
      <input type="text" v-model="personalityId" name="personalityId" placeholder="ID Личного дела"/>
      <input type="text" v-model="student_cardId" name="student_card_id" placeholder="Номер студенческого билета"/>
      <input type="text" v-model="group_name_post" name="group_name" placeholder="Группа"/>
      <input type="submit" class="btn btn-primary addStudent" value="Создать студента">
    </form>
    <form v-on:submit.prevent="findStudents">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="student_card_id" name="studentCardId" placeholder="Номер студенческой книжки"/>
      <input type="number" v-model="personality_id" name="personalityId" placeholder="ID Личного дела"/>
      <input type="number" v-model="group_id" name="groupId" placeholder="ID группы"/>
      <input type="submit" class="btn btn-secondary findStudents" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">ID Личного дела</th>
      <th scope="col">Номер студенческой книжки</th>
      <th scope="col">ID группы</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="student in this.students" v-bind:key="student.id">
        <td>{{student.id}}</td>
        <td>{{student.personality}}</td>
        <td>{{student.studentCardId}}</td>
        <td>{{student.group}}</td>
        <td>
          <router-link type="submit" class="btn btn-info showStudent" :to="'/admin/personalities/' + student.personality">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminStudentsService from "@/components/admin/services/AdminStudentsService";

export default {
  name: "adminStudents",
  data() {
    return {
      id: null,
      student_card_id: '',
      personality_id: null,
      group_id: null,
      students: [],

      personalityId: null,
      student_cardId: '',
      group_name_post: ''
    }
  },
  async mounted(){
    await this.getStudents()
  },
  methods: {
    addStudent: function (){
      AdminStudentsService.postStudent(this.personalityId, this.student_cardId, this.group_name_post)
    },
    getStudents: function (){
      AdminStudentsService.getStudents()
          .then((response) => {
            this.students = response.data
          })
    },
    findStudents: function () {
      AdminStudentsService.filterStudents(this.id, this.student_card_id, this.personality_id, this.group_id)
          .then((response) => {
            this.students = response.data
          })
    }
  }
}
</script>

<style scoped>

</style>