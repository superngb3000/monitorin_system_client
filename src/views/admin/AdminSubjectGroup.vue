<template>
  <div>
    <h2>Предмет: {{subject.name}}</h2>
    <h2>Группа: {{group.name}}</h2>

    <h3>Лекции</h3>
    <div v-for="lesson in this.lessons" v-bind:key="lesson.id">

      <table class="table table-bordered">
        <thead>
          <th scope="col">ID лекции</th>
          <th scope="col">Название лекции</th>
        </thead>
        <tbody>
          <td>{{lesson.id}}</td>
          <td>{{lesson.name}}</td>
        </tbody>
      </table>

      <table class="table table-bordered">
        <thead>
          <th scope="col">ID студента</th>
          <th scope="col">Номер студенческого билета</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Отчество</th>
          <th scope="col">Отметка</th>
          <th scope="col"></th>
        </thead>
        <tbody>
        <tr v-for="student in students" v-bind:key="student.id">
          <td>{{student.id}}</td>
          <td>{{student.studentCardId}}</td>
          <td>{{student.personality.secondName}}</td>
          <td>{{student.personality.firstName}}</td>
          <td>{{student.personality.middleName}}</td>
<!--          v-if="attendance.student === student.id && attendance.lesson === lesson.id"-->
          <td v-for="attendance in student.attendance"  v-bind:key="attendance.id" v-if="attendance.lesson === lesson.id">
            <label >
              <input type="text" v-model="attendance_mark" name="attendance_mark" :placeholder="attendance.attendanceMark" />
            </label>
          </td>
          <td>
            <form v-on:submit.prevent="findAttendanceByLessonAndStudent(lesson, student)">
              <input type="submit" class="btn btn-warning findAttendanceByLessonAndStudent" value="Редактировать"/>
            </form>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

    <h3>Оцениваемые работы</h3>
    <div v-for="checkpoint in this.checkpoints" v-bind:key="checkpoint.id">

      <table class="table table-bordered">
        <thead>
        <th scope="col">ID работы</th>
        <th scope="col">Название работы</th>
        </thead>
        <tbody>
        <td>{{checkpoint.id}}</td>
        <td>{{checkpoint.name}}</td>
        </tbody>
      </table>
      <table class="table table-bordered">
        <thead>
        <th scope="col">ID студента</th>
        <th scope="col">Номер студенческого билета</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Отчество</th>
        <th scope="col">Оценка</th>
        <th scope="col"></th>
        </thead>
        <tbody>
        <tr v-for="student in students" v-bind:key="student.id">
          <td>{{student.id}}</td>
          <td>{{student.studentCardId}}</td>
          <td>{{student.personality.secondName}}</td>
          <td>{{student.personality.firstName}}</td>
          <td>{{student.personality.middleName}}</td>
<!--          v-if="score.student === student.id && score.checkpoint === checkpoint.id"-->
          <td v-for="score in student.scores"  v-bind:key="score.id" v-if="score.checkpoint === checkpoint.id">
            <label >
              <input type="text" v-model="score_mark" name="score_mark" :placeholder="score.scoreMark" />
            </label>
          </td>
          <td>
            <form v-on:submit.prevent="findScoreByLessonAndStudent(checkpoint, student)">
              <input type="submit" class="btn btn-warning findScoreByLessonAndStudent" value="Редактировать"/>
            </form>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import AdminGroupsService from "@/components/admin/services/AdminGroupsService";
import AdminPersonalitiesService from "@/components/admin/services/AdminPersonalitiesService";
import AdminSubjectsService from "@/components/admin/services/AdminSubjectsService";
import AdminEventsService from "@/components/admin/services/AdminEventsService";
import AdminMarksService from "@/components/admin/services/AdminMarksService";

export default {
  name: "AdminSubjectGroup",
  data() {
    return {
      group_id: this.$route.params.group_id,
      subject_id: this.$route.params.subject_id,

      lessons: [],
      checkpoints: [],
      students: [],
      scores: [],
      attendances: [],

      group: null,
      subject: null,

      attendance_mark: '',
      score_mark: ''
    }
  },
  async mounted(){
    await this.getGroup()
    // await this.getSubject()
  },
  methods: {
    getGroup: function (){
      AdminGroupsService.getGroup(this.group_id)
          .then(response=>{
            this.group = response.data
            console.log("group ", this.group)
            this.getStudents()
          })
    },
    getStudents: function (){
      AdminGroupsService.getStudentsByGroup(this.group_id)
          .then(response=>{
            this.students = response.data
            console.log("students ", this.students)
            this.getPersonalities()
          })
    },
    getPersonalities: function (){
      for (let student of this.students)
        AdminPersonalitiesService.getPersonality(student.personality)
            .then(response=>{
              student.personality = response.data
            })
      console.log("students + person", this.students)
      this.getSubject()
    },
    getSubject: function (){
      AdminSubjectsService.getSubject(this.subject_id)
          .then(response=>{
            this.subject = response.data
            console.log("subject: ", this.subject)
            this.getEvents()
          })
    },
    getEvents: function () {
      this.getLessons()
      this.getCheckpoints()
    },
    getLessons: function (){
      for (let lesson of this.subject.lessons)
        AdminEventsService.getLesson(lesson)
            .then(response=>{
              this.lessons.push(response.data)

            })
      console.log("lessons: ", this.lessons)
      this.getAttendance()
    },
    getCheckpoints: function (){
      for (let checkpoint of this.subject.checkpoints)
        AdminEventsService.getCheckpoint(checkpoint)
            .then(response=>{
              this.checkpoints.push(response.data)

            })
      console.log("checkpoints", this.checkpoints)

      this.getScores()
    },
    getAttendance: function (){
      for (let student of this.students) {
        AdminMarksService.filterAttendance(null, student.id, null)
            .then(response => {
              this.attendances.push(response.data)
              student.attendance = response.data
            })
      }
      // for (let student of this.students) {
      //   console.log("getAtt ", this.lessons)
      //   for (let lesson of this.lessons) {
      //     console.log("student ", student.id, " lesson ", lesson.id)
      //     AdminMarksService.filterAttendance(null, student.id, lesson.id)
      //         .then(response => {
      //           this.attendances.push(response.data)
      //         })
      //   }
      // }
      console.log("attendances: ", this.attendances)
    },
    getScores: function (){
      for (let student of this.students)
          AdminMarksService.filterScores(null, student.id, null)
              .then(response=>{
                this.scores.push(response.data)
                student.scores = response.data
              })
      // for (let student of this.students)
      //   for (let checkpoint of this.checkpoints)
      //     AdminMarksService.filterScores(null, student.id, checkpoint.id)
      //         .then(response=>{
      //           this.scores.push(response.data)
      //         })
      console.log("scores: ", this.scores)
    },
    findAttendanceByLessonAndStudent: function (lesson, student) {
      AdminMarksService.filterAttendance(null, student.id, lesson.id)
          .then(response=>{
            let attendance = response.data
            this.editAttendanceMark(attendance[0])
          })
    },
    editAttendanceMark: function (attendance){
      AdminMarksService.editAttendance(attendance, this.attendance_mark)
          .then(response=>{
            this.editStatusResponse = response.data
            this.editStatus = this.editStatusResponse? 'Отметка успешно изменена':'Не удалось изменить отметку'
          })
    },
    findScoreByLessonAndStudent: function (checkpoint, student) {
      AdminMarksService.filterScores(null, student.id, checkpoint.id)
          .then(response=>{
            let checkpoint = response.data
            this.editScoreMark(checkpoint[0])
          })
    },
    editScoreMark: function (checkpoint){
      AdminMarksService.editScore(checkpoint, this.score_mark)
          .then(response=>{
            this.editStatusResponse = response.data
            this.editStatus = this.editStatusResponse? 'Отметка успешно изменена':'Не удалось изменить отметку'
          })
    }
  }
}
</script>

<style scoped>

</style>