<template>
  <div>
    <h2>Группа: {{group.name}}</h2>

    <h5 v-if="editGroupStatusResponse != null">{{editGroupStatus}}</h5>
    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Имя группы</th>
      <th scope="col"></th>
      </thead>
      <tr>
        <td>{{group.id}}</td>
        <td>
          <label>
            <input type="text" v-model="name" name="name" :placeholder="group.name" />
          </label>
        </td>
        <td>
          <form v-on:submit.prevent="editGroup">
            <input type="submit" class="btn btn-warning editGroup" value="Редактировать"/>
          </form>
        </td>
      </tr>
    </table>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">ID Личного дела</th>
      <th scope="col">Номер студенческого билета</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="student in this.students" v-bind:key="student.id">
        <td>{{student.id}}</td>
        <td>{{student.personality}}</td>
        <td>{{student.studentCardId}}</td>
        <td>
          <router-link type="submit" class="btn btn-info" :to="'/admin/personalities/' + student.personality">Подробнее</router-link>
        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
import AdminPersonalitiesService from "@/components/admin/services/AdminPersonalitiesService";
import AdminGroupsService from "@/components/admin/services/AdminGroupsService";

export default {
  name: "AdminGroup",
  data() {
    return {
      editGroupStatus: '',
      editGroupStatusResponse: null,

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
      AdminPersonalitiesService.getPersonality(student.personality)
          .then(response => {
            this.personality = response.data
          })
    },
    getStudents: function () {
      AdminGroupsService.getStudentsByGroup(this.id)
          .then(response => {
            this.students = response.data
            console.log(this.students)
          })
    },
    getGroup: function () {
      AdminGroupsService.getGroup(this.id)
          .then(response => {
            this.group = response.data
            console.log(this.group)
            this.getStudents()
          })
    },
    editGroup: function () {
      AdminGroupsService.editGroup(this.id, this.name)
          .then(response => {
            this.editGroupStatusResponse = response.data
            this.editGroupStatus = this.editGroupStatusResponse ? 'Данные группы успешно изменены' : 'Не удалось изменить данные группы'
          })
    }
  }
}
</script>

<style scoped>

</style>