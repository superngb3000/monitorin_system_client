<template>
  <div>
    <h2>Предмет: {{subject.name}}</h2>
    <h2>Группа: {{group.name}}</h2>

<!--    <h3>Лекции</h3>-->
    <div v-for="lesson in this.lessons" v-bind:key="lesson.id">

      <table class="table table-bordered">
        <thead>
        <th scope="col"></th>
        </thead>
        <tbody>
        <h3>{{lesson.name}}</h3>
        </tbody>
      </table>

      <table class="table table-bordered">
        <thead>
        <th scope="col">Номер студенческого билета</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Отчество</th>
        <th scope="col">Отметка</th>
        <th scope="col">Новая отметка</th>
        <th scope="col">Действие</th>
        <th scope="col"></th>
        </thead>
        <tbody>
        <tr v-for="student in students" v-bind:key="student.id">
          <td>{{student.studentCardId}}</td>
          <td>{{student.personality.secondName}}</td>
          <td>{{student.personality.firstName}}</td>
          <td>{{student.personality.middleName}}</td>
          <td v-for="attendance in student.attendance"  v-bind:key="attendance.id" v-if="attendance.lesson === lesson.id">
            <a>{{attendance.attendanceMark}}</a>
          </td>
          <td v-for="attendance in student.attendance"  v-bind:key="attendance.id" v-if="attendance.lesson === lesson.id">
            <label >
              <input type="text" v-model="attendance_mark" name="attendance_mark"/>
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

<!--    <h3>Оцениваемые работы</h3>-->
    <div v-for="checkpoint in this.checkpoints" v-bind:key="checkpoint.id">

      <table class="table table-bordered">
        <thead>
        <th scope="col"></th>
        </thead>
        <tbody>
        <h3>{{checkpoint.name}}</h3>
        </tbody>
      </table>
      <table class="table table-bordered">
        <thead>
        <th scope="col">Номер студенческого билета</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Имя</th>
        <th scope="col">Отчество</th>
        <th scope="col">Оценка</th>
        <th scope="col">Новая оценка</th>
        <th scope="col">Действие</th>
        </thead>
        <tbody>
        <tr v-for="student in students" v-bind:key="student.id">
          <td>{{student.studentCardId}}</td>
          <td>{{student.personality.secondName}}</td>
          <td>{{student.personality.firstName}}</td>
          <td>{{student.personality.middleName}}</td>
          <td v-for="score in student.scores"  v-bind:key="score.id" v-if="score.checkpoint === checkpoint.id">
            <a>{{score.scoreMark}}</a>
          </td>
          <td v-for="score in student.scores"  v-bind:key="score.id" v-if="score.checkpoint === checkpoint.id">
            <label >
              <input type="text" v-model="score_mark" name="score_mark" />
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
import TeacherGroupsService from "@/components/teacher/services/TeacherGroupsService";
import TeacherPersonalitiesService from "@/components/teacher/services/TeacherPersonalitiesService";
import TeacherSubjectsService from "@/components/teacher/services/TeacherSubjectsService";
import TeacherEventsService from "@/components/teacher/services/TeacherEventsService";
import TeacherMarksService from "@/components/teacher/services/TeacherMarksService";

export default {
  name: "TeacherSubjectGroup",
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
      TeacherGroupsService.getGroup(this.group_id)
          .then(response=>{
            this.group = response.data
            console.log("group ", this.group)
            this.getStudents()
          })
    },
    getStudents: function (){
      TeacherGroupsService.getStudentsByGroup(this.group_id)
          .then(response=>{
            this.students = response.data
            console.log("students ", this.students)
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
    getSubject: function (){
      TeacherSubjectsService.getSubject(this.subject_id)
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
        TeacherEventsService.getLesson(lesson)
            .then(response=>{
              this.lessons.push(response.data)

            })
      console.log("lessons: ", this.lessons)
      this.getAttendance()
    },
    getCheckpoints: function (){
      for (let checkpoint of this.subject.checkpoints)
        TeacherEventsService.getCheckpoint(checkpoint)
            .then(response=>{
              this.checkpoints.push(response.data)

            })
      console.log("checkpoints", this.checkpoints)

      this.getScores()
    },
    getAttendance: function (){
      for (let student of this.students) {
        TeacherMarksService.filterAttendance(null, student.id, null)
            .then(response => {
              this.attendances.push(response.data)
              student.attendance = response.data
            })
      }
      console.log("attendances: ", this.attendances)
    },
    getScores: function (){
      for (let student of this.students)
        TeacherMarksService.filterScores(null, student.id, null)
            .then(response=>{
              this.scores.push(response.data)
              student.scores = response.data
            })
      console.log("scores: ", this.scores)
    },
    findAttendanceByLessonAndStudent: function (lesson, student) {
      TeacherMarksService.filterAttendance(null, student.id, lesson.id)
          .then(response=>{
            let attendance = response.data
            this.editAttendanceMark(attendance[0])
          })
    },
    editAttendanceMark: function (attendance){
      TeacherMarksService.editAttendance(attendance, this.attendance_mark)
          .then(response=>{
            this.editStatusResponse = response.data
            this.editStatus = this.editStatusResponse? 'Отметка успешно изменена':'Не удалось изменить отметку'
          })
    },
    findScoreByLessonAndStudent: function (checkpoint, student) {
      TeacherMarksService.filterScores(null, student.id, checkpoint.id)
          .then(response=>{
            let checkpoint = response.data
            this.editScoreMark(checkpoint[0])
          })
    },
    editScoreMark: function (checkpoint){
      TeacherMarksService.editScore(checkpoint, this.score_mark)
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