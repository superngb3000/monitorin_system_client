<template>
  <div>
    <h2>Предмет: {{subject.name}}</h2>
    <h5 v-if="editStatusResponse != null">{{editStatus}}</h5>
    <h5 v-if="addStatusResponse != null">{{addStatus}}</h5>
    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Название предмета</th>
      <th scope="col"></th>
      </thead>
      <tr>
        <td>{{subject.id}}</td>
        <td>
          <label>
            <input type="text" v-model="name" name="name" :placeholder="subject.name" />
          </label>
        </td>
        <td>
          <form v-on:submit.prevent="editSubject">
            <input type="submit" class="btn btn-warning editSubject" value="Редактировать"/>
          </form>
        </td>
      </tr>
    </table>

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
            <!--              <th scope="col"></th>-->
            </thead>
            <tbody>
            <tr v-for="lesson in this.lessons" v-bind:key="lesson.id">
              <td>{{lesson.name}}</td>
              <!--              <td>-->
              <!--                <router-link type="submit" class="btn btn-primary" :to="'/teacher/lesson/' + lesson.id">Подробнее</router-link>-->
              <!--              </td>-->
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
            <!--              <th scope="col"></th>-->
            </thead>
            <tbody>
            <tr v-for="checkpoint in this.checkpoints" v-bind:key="checkpoint.id">
              <td>{{checkpoint.name}}</td>
              <!--              <td>-->
              <!--                <router-link type="submit" class="btn btn-primary" :to="'/teacher/checkpoint/' + checkpoint.id">Подробнее</router-link>-->
              <!--              </td>-->
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

<!--    <h4>Лекции</h4>-->
<!--    <form v-on:submit.prevent="addLessonToSubject">-->
<!--      <input type="text" v-model="lesson_name" name="lesson_name" placeholder="Название лекции"/>-->
<!--      <input type="submit" class="btn btn-primary addLessonToSubject" value="Добавить">-->
<!--    </form>-->
<!--    <table class="table table-bordered">-->
<!--      <thead>-->
<!--      <th scope="col">ID</th>-->
<!--      <th scope="col">Название лекции</th>-->
<!--      <th scope="col"></th>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="lesson in this.lessons" v-bind:key="lesson.id">-->
<!--        <td>{{lesson.id}}</td>-->
<!--        <td>{{lesson.name}}</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->

<!--    <h4>Оцениваемые работы</h4>-->
<!--    <form v-on:submit.prevent="addCheckpointToSubject">-->
<!--      <input type="text" v-model="checkpoint_name" name="checkpoint_name" placeholder="Название работы"/>-->
<!--      <input type="submit" class="btn btn-primary addCheckpointToSubject" value="Добавить">-->
<!--    </form>-->
<!--    <table class="table table-bordered">-->
<!--      <thead>-->
<!--      <th scope="col">ID</th>-->
<!--      <th scope="col">Название работы</th>-->
<!--      <th scope="col"></th>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="checkpoint in this.checkpoints" v-bind:key="checkpoint.id">-->
<!--        <td>{{checkpoint.id}}</td>-->
<!--        <td>{{checkpoint.name}}</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->

    <table class="table table-bordered">
      <thead>
      <th scope="col"><h3>Преподаватели</h3></th>
      <th scope="col"><h3>Группы</h3></th>
      </thead>
      <tbody>
      <tr>
        <td>
          <form v-on:submit.prevent="addTeacherToSubject">
            <input type="number" v-model="teacher_id" name="teacherId" placeholder="ID преподавателя"/>
            <input type="submit" class="btn btn-primary addTeacherToSubject" value="Добавить">
          </form>
          <table class="table table-bordered">
            <thead>
            <th scope="col">ID</th>
            <th scope="col">ID личного дела</th>
            <th scope="col"></th>
            </thead>
            <tbody>
            <tr v-for="teacher in this.teachers" v-bind:key="teacher.id">
              <td>{{teacher.id}}</td>
              <td>{{teacher.personality}}</td>
              <td>
                <router-link type="submit" class="btn btn-primary" :to="'/admin/personalities/' + teacher.personality">Подробнее</router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
        <td>
          <form v-on:submit.prevent="addGroupToSubject">
            <input type="number" v-model="group_id" name="groupId" placeholder="ID группы"/>
            <input type="submit" class="btn btn-primary addGroupToSubject" value="Добавить">
          </form>
          <table class="table table-bordered">
            <thead>
            <th scope="col">ID</th>
            <th scope="col">Название группы</th>
            <th scope="col"></th>
            </thead>
            <tbody>
            <tr v-for="group in this.groups" v-bind:key="group.id">
              <td>{{group.id}}</td>
              <td>{{group.name}}</td>
              <td>
                <router-link type="submit" class="btn btn-primary" :to="'/admin/group/' + group.id">Подробнее</router-link>
              </td>
              <td>
                <router-link type="submit" class="btn btn-primary" :to="'/admin/subject/' + $data.id + '/group/' + group.id">Оценки</router-link>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

<!--    <h4>Преподаватели</h4>-->
<!--    <form v-on:submit.prevent="addTeacherToSubject">-->
<!--      <input type="number" v-model="teacher_id" name="teacherId" placeholder="ID преподавателя"/>-->
<!--      <input type="submit" class="btn btn-primary addTeacherToSubject" value="Добавить">-->
<!--    </form>-->
<!--    <table class="table table-bordered">-->
<!--      <thead>-->
<!--      <th scope="col">ID</th>-->
<!--      <th scope="col">ID личного дела</th>-->
<!--      <th scope="col"></th>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="teacher in this.teachers" v-bind:key="teacher.id">-->
<!--        <td>{{teacher.id}}</td>-->
<!--        <td>{{teacher.personality}}</td>-->
<!--        <td>-->
<!--          <router-link type="submit" class="btn btn-primary" :to="'/admin/personalities/' + teacher.personality">Подробнее</router-link>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->

<!--    <h4>Группы</h4>-->
<!--    <form v-on:submit.prevent="addGroupToSubject">-->
<!--      <input type="number" v-model="group_id" name="groupId" placeholder="ID группы"/>-->
<!--      <input type="submit" class="btn btn-primary addGroupToSubject" value="Добавить">-->
<!--    </form>-->
<!--    <table class="table table-bordered">-->
<!--      <thead>-->
<!--      <th scope="col">ID</th>-->
<!--      <th scope="col">Название группы</th>-->
<!--      <th scope="col"></th>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="group in this.groups" v-bind:key="group.id">-->
<!--        <td>{{group.id}}</td>-->
<!--        <td>{{group.name}}</td>-->
<!--        <td>-->
<!--          <router-link type="submit" class="btn btn-primary" :to="'/admin/group/' + group.id">Подробнее</router-link>-->
<!--        </td>-->
<!--        <td>-->
<!--          <router-link type="submit" class="btn btn-primary" :to="'/admin/subject/' + $data.id + '/group/' + group.id">Оценки</router-link>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
  </div>
</template>

<script>
import AdminSubjectsService from "@/components/admin/services/AdminSubjectsService";
import AdminEventsService from "@/components/admin/services/AdminEventsService";
import AdminTeachersService from "@/components/admin/services/AdminTeachersService";
import AdminGroupsService from "@/components/admin/services/AdminGroupsService";

export default {
  name: "AdminSubject",
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
    addGroupToSubject: function () {
      AdminSubjectsService.addGroupToSubject(this.id, this.group_id)
          .then(response=>{
            this.addStatusResponse = response.data
            this.addStatus = this.addStatusResponse? 'Группа успешно добавлена':'Не удалось добавить группу'
          })
    },
    addTeacherToSubject: function () {
      AdminSubjectsService.addTeacherToSubject(this.id, this.teacher_id)
          .then(response=>{
            this.addStatusResponse = response.data
            this.addStatus = this.addStatusResponse? 'Преподаватель успешно добавлен':'Не удалось добавить преподавателя'
          })
    },
    addLessonToSubject: function () {
      AdminEventsService.addLessonToSubject(this.lesson_name, this.id).then(response=>{
            this.addStatusResponse = response.data
            this.addStatus = this.addStatusResponse? 'Лекция успешно добавлена':'Не удалось добавить лекцию'
          })
    },
    addCheckpointToSubject: function () {
      AdminEventsService.addCheckpointToSubject(this.checkpoint_name, this.id)
          .then(response=>{
            this.addStatusResponse = response.data
            this.addStatus = this.addStatusResponse? 'Работа успешно добавлен':'Не удалось добавить работу'
          })
    },
    getSubject: function (){
      AdminSubjectsService.getSubject(this.id)
          .then(response=>{
            this.subject = response.data
            console.log(this.subject)

            this.getTeachers()
            this.getLessons()
            this.getCheckpoints()
            this.getGroups()
          })
    },
    getLessons: function (){
      for (let lesson of this.subject.lessons)
        AdminEventsService.getLesson(lesson)
            .then(response=>{
              this.lessons.push(response.data)
            })
    },
    getCheckpoints: function (){
      for (let checkpoint of this.subject.checkpoints)
        AdminEventsService.getCheckpoint(checkpoint)
            .then(response=>{
              this.checkpoints.push(response.data)
            })
    },
    getTeachers: function (){
      for (let teacher of this.subject.teachers)
        AdminTeachersService.getTeacher(teacher)
            .then(response=>{
              this.teachers.push(response.data)
            })
    },
    getGroups: function (){
      for (let group of this.subject.groups)
        AdminGroupsService.getGroup(group)
            .then(response=>{
              this.groups.push(response.data)
            })
    },
    editSubject: function () {
      AdminSubjectsService.editSubject(this.id, this.name)
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