<template>
  <div>
    <h2>Группа: {{group.name}}</h2>
    <table class="table table-bordered">
      <thead>
      <th scope="col">Номер студенческого билета</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Отчество</th>
      </thead>
      <tbody>
      <tr v-for="student in students" v-bind:key="student.id">
        <td>{{student.studentCardId}}</td>
        <td>{{student.personality.secondName}}</td>
        <td>{{student.personality.firstName}}</td>
        <td>{{student.personality.middleName}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TeacherPersonalitiesService from "@/components/teacher/services/TeacherPersonalitiesService";
import TeacherGroupsService from "@/components/teacher/services/TeacherGroupsService";

export default {
  name: "TeacherGroup",
  data() {
    return {
      personality: null,
      id: this.$route.params.id,
      first_name: '',
      second_name: '',
      middle_name: '',
      email: '',

      students: [],
      student_card_id: "",

      group: null,
      name: '',
    }
  },
  async mounted() {
    await this.getGroup()
  },
  methods: {
    getPersonality: function (student) {
      TeacherPersonalitiesService.getPersonality(student.personality)
          .then(response => {
            this.personality = response.data
          })
    },
    getStudents: function () {
      TeacherGroupsService.getStudentsByGroup(this.id)
          .then(response => {
            this.students = response.data
            this.getPersonalities()
          })
    },
    getPersonalities: function (){
      for (let student of this.students)
        TeacherPersonalitiesService.getPersonality(student.personality)
            .then(response=>{
              student.personality = response.data
            })
      console.log("students + person", this.students)
      this.getSubject()
    },
    getGroup: function () {
      TeacherGroupsService.getGroup(this.id)
          .then(response => {
            this.group = response.data
            console.log(this.group)
            this.getStudents()
          })
    }
  }
}
</script>

<style scoped>

</style>