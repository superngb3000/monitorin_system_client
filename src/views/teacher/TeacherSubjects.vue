<template>
  <div>
    <form v-on:submit.prevent="findSubjects">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="name" name="name" placeholder="Название предмета"/>
      <input type="submit" class="btn btn-secondary findSubjects" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">Название предмета</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="subject in this.subjects" v-bind:key="subject.id">
        <td>{{subject.name}}</td>
        <td>
          <router-link type="submit" class="btn btn-info showSubject" :to="'/teacher/subject/' + subject.id">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TeacherSubjectsService from "@/components/teacher/services/TeacherSubjectsService";
import TeacherPersonalitiesService from "@/components/teacher/services/TeacherPersonalitiesService";

export default {
  name: "TeacherSubject",
  data() {
    return {
      personalityId: this.$store.getters.getPersonalityId,
      teacher: null,
      id: null,
      name: '',
      subjects: []
    }
  },
  async mounted(){
    await this.getTeacher()
  },
  methods: {
    getTeacher: function (){
      console.log("personality ", this.personalityId)
      TeacherPersonalitiesService.getTeacher(this.personalityId)
          .then((response) => {
            this.teacher = response.data
            console.log("teacher ",this.teacher)
            this.getSubjects(this.teacher.subjects)
          })
    },
    getSubjects: function (subjects){
      for (let subject of subjects){
        TeacherSubjectsService.getSubject(subject)
            .then((response) => {
              this.subjects.push(response.data)
              // console.log(subject, " subjects ", this.subjects)
            })
      }
      console.log("subjects ", this.subjects)
    },
    findSubjects: function () {
      TeacherSubjectsService.filterSubjects(this.id, this.name).then((response) => {
        this.subjects = response.data
        console.log("subjects ",this.subjects)
      })
    }
  }
}
</script>

<style scoped>

</style>