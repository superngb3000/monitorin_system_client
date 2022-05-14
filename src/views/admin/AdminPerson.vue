<template>
  <div>
    <h3>Личные данные</h3>
    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Отчество</th>
      <th scope="col">Email</th>
      <th scope="col"></th>
      </thead>

      <tr>
        <td>{{personality.id}}</td>
        <td>
          <label>
            <input type="text" v-model="second_name" name="second_name" :placeholder="personality.secondName" />
          </label>
        </td>
        <td>
          <label>
            <input type="text" v-model="first_name" name="first_name" :placeholder="personality.firstName" />
          </label>
        </td>
        <td>
          <label>
            <input type="text" v-model="middle_name" name="middle_name" :placeholder="personality.middleName" />
          </label>
        </td>
        <td>
          <label>
            <input type="text" v-model="email" name="email" :placeholder="personality.email" />
          </label>
        </td>
        <td>
          <form v-on:submit.prevent="editPersonality">
            <input type="submit" class="btn btn-warning editPersonality" value="Редактировать"/>
          </form>
        </td>
      </tr>
    </table>

    <h3>Данные пользователя</h3>
    <h5 v-if="postUserStatusResponse != null">{{postUserStatus}}</h5>
    <form v-if="user == null" v-on:submit.prevent="addUser">
      <input type="text" v-model="username" name="username" placeholder="Логин"/>
      <input type="text" v-model="password" name="password" placeholder="Пароль"/>
      <input type="text" v-model="role" name="role" placeholder="Роль"/>
      <input type="submit" class="btn btn-primary addUser" value="Создать пользователя">
    </form>
    <table v-if="user != null" class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Логин</th>
      <th scope="col">Роли</th>
      <th scope="col"></th>
      </thead>
      <tr>
        <td>{{user.id}}</td>
        <td>
          <label>
            <input type="text" v-model="username" name="username" :placeholder="user.username" />
          </label>
        </td>
        <td>
          <label>
            <input type="checkbox" v-model="role_user" value="true" :checked="role_user" name="ROLE_USER"/>ROLE_USER
          </label>
          <label>
            <input type="checkbox" v-model="role_admin" value="true" :checked="role_admin" name="ROLE_ADMIN"/>ROLE_ADMIN
          </label>
        </td>
        <td>
          <form v-on:submit.prevent="editUser">
            <input type="submit" class="btn btn-warning editUser" value="Редактировать"/>
          </form>
        </td>
      </tr>
    </table>

    <table class="table table-bordered">
      <thead>
      <th scope="col"><h3>Данные студента</h3></th>
      <th scope="col"><h3>Данные преподавателя</h3></th>
      </thead>
      <tbody>
      <tr>
        <td>
          <h5 v-if="postStudentStatusResponse != null">{{postStudentStatus}}</h5>
          <form v-if="student == null" v-on:submit.prevent="addStudent">
            <input type="text" v-model="student_card_id" name="student_card_id" placeholder="Номер студенческого билета"/>
            <input type="text" v-model="group_name_post" name="group_name" placeholder="Группа"/>
            <input type="submit" class="btn btn-primary addStudent" value="Создать студента">
          </form>

          <table v-if="student != null" class="table table-bordered">
            <thead>
            <th scope="col">ID</th>
            <th scope="col">Номер студенческого билета</th>
            <th scope="col">Группа</th>
            <th scope="col"></th>
            </thead>
            <tr>
              <td>{{student.id}}</td>
              <td>{{student.studentCardId}}</td>
              <td>
                <label>
                  <input type="text" v-model="group_name" name="group_name" :placeholder="group.name" />
                </label>
              </td>
              <td>
                <form v-on:submit.prevent="editStudent">
                  <input type="submit" class="btn btn-warning editStudent" value="Редактировать"/>
                </form>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <h5 v-if="postTeacherStatusResponse != null">{{postTeacherStatus}}</h5>
          <form v-if="teacher == null" v-on:submit.prevent="addTeacher">
            <input type="submit" class="btn btn-primary addTeacher" value="Создать преподавателя">
          </form>

          <table v-if="teacher != null" class="table table-bordered">
            <thead>
            <th scope="col">ID</th>
            </thead>
            <tr>
              <td>{{teacher.id}}</td>
            </tr>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import AdminUsersService from "@/components/admin/services/AdminUsersService";
import AdminStudentsService from "@/components/admin/services/AdminStudentsService";
import AdminTeachersService from "@/components/admin/services/AdminTeachersService";
import AdminPersonalitiesService from "@/components/admin/services/AdminPersonalitiesService";
import AdminGroupsService from "@/components/admin/services/AdminGroupsService";

export default {
  name: "AdminPerson",
  data() {
    return {
      editStudentStatus: '',
      editStudentStatusResponse: null,

      editUserStatus: '',
      editUserStatusResponse: null,

      editPersonalityStatus: '',
      editPersonalityStatusResponse: null,

      postStudentStatus: '',
      postStudentStatusResponse: null,

      postUserStatus: '',
      postUserStatusResponse: null,

      postTeacherStatus: '',
      postTeacherStatusResponse: null,

      personality: null,
      id: this.$route.params.id,
      first_name: '',
      second_name: '',
      middle_name: '',
      email: '',

      user: null,
      username: '',
      password: '',
      role: '',
      role_user: false,
      role_admin: false,

      student: null,
      student_card_id: '',
      group_name_post: '',
      group_name: '',

      group: null,

      teacher: null
    }
  },
  async mounted(){
    await this.getPersonality()
  },
  methods: {
    addUser: function (){
      AdminUsersService.postUser(this.id, this.username, this.password, this.role)
          .then(response=>{
            this.postUserStatusResponse = response.data
            this.postUserStatus = this.postUserStatusResponse? 'Пользователь успешно создан':'Не удалось создать пользователя'
          })
    },
    addStudent: function (){
      AdminStudentsService.postStudent(this.id, this.student_card_id, this.group_name_post)
          .then(response=>{
            this.postStudentStatusResponse = response.data
            this.postStudentStatus = this.postStudentStatusResponse? 'Студент успешно создан':'Не удалось создать студента'
          })
    },
    addTeacher: function (){
      AdminTeachersService.postTeacher(this.id)
          .then(response=>{
            this.postTeacherStatusResponse = response.data
            this.postTeacherStatus = this.postTeacherStatusResponse? 'Преподаватель успешно создан':'Не удалось создать преподавателя'
          })
    },
    getPersonality: function (){
      AdminPersonalitiesService.getPersonality(this.id)
          .then(response=>{
            this.personality = response.data
            console.log(this.personality)

            this.getUser()
            this.getStudent()
            this.getTeacher()
          })
    },
    getUser: function (){
      AdminPersonalitiesService.getUser(this.id)
          .then(response=>{
            this.user = response.data
            for (let i=0; i<this.user.roles.length;++i) {
              if (this.user.roles[i] === 'ROLE_USER') this.role_user = true
              if (this.user.roles[i] === 'ROLE_ADMIN') this.role_admin = true
            }})
    },
    getStudent: function (){
      AdminPersonalitiesService.getStudent(this.id)
          .then(response=>{
            this.student = response.data
            console.log(this.student)

            this.getGroup(this.student)
          })
    },
    getGroup: function (student){
      AdminGroupsService.getGroup(student.group)
          .then(response=>{
            this.group = response.data
          })
    },
    getTeacher: function (){
      AdminPersonalitiesService.getTeacher(this.id)
          .then(response=>{
            this.teacher = response.data
          })
    },
    editUser: function () {
      AdminUsersService.editUser(this.user.id, this.username, this.role_user, this.role_admin)
          .then(response=>{
            this.editUserStatusResponse = response.data
            this.editUserStatus = this.editUserStatusResponse? 'Данные пользователя успешно изменены':'Не удалось изменить данные пользователя'
          })
    },
    editPersonality: function () {
      AdminPersonalitiesService.editPersonality(this.id, this.first_name, this.second_name, this.middle_name, this.email)
          .then(response=>{
            this.editPersonalityStatusResponse = response.data
            this.editPersonalityStatus = this.editPersonalityStatusResponse? 'Личные данные успешно изменены':'Не удалось изменить личные данные'
          })
    },
    editStudent: function () {
      AdminStudentsService.editStudent(this.student.id, this.group_name)
          .then(response=>{
            this.editStudentStatusResponse = response.data
            this.editStatus = this.editStudentStatusResponse? 'Данные студента успешно изменены':'Не удалось изменить данные студента'
          })
    }
  }
}
</script>

<style scoped>

</style>