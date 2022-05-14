<template>
  <div>
    <h2>Предмет: {{subject.name}}</h2>
    <h5 v-if="editStatusResponse != null">{{editStatus}}</h5>
    <h5 v-if="addStatusResponse != null">{{addStatus}}</h5>

    <table class="table table-bordered">
      <thead>
        <th scope="col"><h3>Лекции</h3></th>
        <th scope="col"><h3>Оцениваемые работы</h3></th>
      </thead>
      <tbody>
      <tr>
        <td>
          <form v-on:submit.prevent="addLessonToSubject">
            <input type="text" v-model="lesson_name" name="lesson_name" placeholder="Название лекции"/>
            <input type="submit" class="btn btn-primary addLessonToSubject" value="Добавить">
          </form>
          <table class="table table-bordered">
            <thead>
              <th scope="col"></th>
            </thead>
            <tbody>
            <tr v-for="lesson in this.lessons" v-bind:key="lesson.id">
              <td>{{lesson.name}}</td>
            </tr>
            </tbody>
          </table>
        </td>
        <td>
          <form v-on:submit.prevent="addCheckpointToSubject">
            <input type="text" v-model="checkpoint_name" name="checkpoint_name" placeholder="Название работы"/>
            <input type="submit" class="btn btn-primary addCheckpointToSubject" value="Добавить">
          </form>
          <table class="table table-bordered">
            <thead>
              <th scope="col"></th>
            </thead>
            <tbody>
            <tr v-for="checkpoint in this.checkpoints" v-bind:key="checkpoint.id">
              <td>{{checkpoint.name}}</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

    <h3>Группы</h3>
    <table class="table table-bordered">
      <thead>
      <th scope="col">Название группы</th>
      <th scope="col"></th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="group in this.groups" v-bind:key="group.id">
        <td>{{group.name}}</td>
        <td>
          <router-link type="submit" class="btn btn-info" :to="'/teacher/group/' + group.id">Подробнее</router-link>
        </td>
        <td>
          <router-link type="submit" class="btn btn-outline-info" :to="'/teacher/subject/' + $data.id + '/group/' + group.id">Оценки</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TeacherSubjectsService from "@/components/teacher/services/TeacherSubjectsService";
import TeacherEventsService from "@/components/teacher/services/TeacherEventsService";
import TeacherGroupsService from "@/components/teacher/services/TeacherGroupsService";

export default {
  name: "TeacherSubject",
  data() {
    return {
      addStatus: '',
      addStatusResponse: null,

      editStatus: '',
      editStatusResponse: null,

      id: this.$route.params.id,

      lessons: [],
      checkpoints: [],
      groups: [],
      teachers: [],

      subject: null,
      name: '',

      teacher_id: null,
      group_id: null,

      lesson_name: '',
      checkpoint_name: ''
    }
  },
  async mounted(){
    await this.getSubject()
  },
  methods: {
    addLessonToSubject: function () {
      TeacherEventsService.addLessonToSubject(this.lesson_name, this.id).then(response=>{
        this.addStatusResponse = response.data
        this.addStatus = this.addStatusResponse? 'Лекция успешно добавлена':'Не удалось добавить лекцию'
      })
    },
    addCheckpointToSubject: function () {
      TeacherEventsService.addCheckpointToSubject(this.checkpoint_name, this.id)
          .then(response=>{
            this.addStatusResponse = response.data
            this.addStatus = this.addStatusResponse? 'Работа успешно добавлен':'Не удалось добавить работу'
          })
    },
    getSubject: function (){
      TeacherSubjectsService.getSubject(this.id)
          .then(response=>{
            this.subject = response.data
            console.log(this.subject)

            this.getLessons()
            this.getCheckpoints()
            this.getGroups()
          })
    },
    getLessons: function (){
      for (let lesson of this.subject.lessons)
        TeacherEventsService.getLesson(lesson)
            .then(response=>{
              this.lessons.push(response.data)
            })
    },
    getCheckpoints: function (){
      for (let checkpoint of this.subject.checkpoints)
        TeacherEventsService.getCheckpoint(checkpoint)
            .then(response=>{
              this.checkpoints.push(response.data)
            })
    },
    getGroups: function (){
      for (let group of this.subject.groups)
        TeacherGroupsService.getGroup(group)
            .then(response=>{
              this.groups.push(response.data)
            })
    },
    editSubject: function () {
      TeacherSubjectsService.editSubject(this.id, this.name)
          .then(response=>{
            this.editStatusResponse = response.data
            this.editStatus = this.editStatusResponse? 'Данные предмета успешно изменены':'Не удалось изменить данные предмета'
          })
    }
  }
}
</script>

<style scoped>

</style>