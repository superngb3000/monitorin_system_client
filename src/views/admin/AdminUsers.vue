<template>
  <div>
    <form v-on:submit.prevent="addUser">
      <input type="text" v-model="personalityId" name="username" placeholder="ID личного дела"/>
      <input type="text" v-model="usernameNew" name="username" placeholder="Логин"/>
      <input type="text" v-model="passwordNew" name="password" placeholder="Пароль"/>
      <input type="text" v-model="roleNew" name="role" placeholder="Роль"/>
      <input type="submit" class="btn btn-primary addUser" value="Создать пользователя">
    </form>
    <form v-on:submit.prevent="findUsers">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="number" v-model="personality" name="personality" placeholder="ID Личного дела"/>
      <input type="text" v-model="username" name="username" placeholder="Username"/>
      <label>
        <input type="checkbox" v-model="role_user" value="true" name="ROLE_USER"/>ROLE_USER
      </label>
      <label>
        <input type="checkbox" v-model="role_admin" value="true" name="ROLE_ADMIN"/>ROLE_ADMIN
      </label>
      <input type="submit" class="btn btn-secondary findUsers" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">ID Личного дела</th>
      <th scope="col">Логин</th>
      <th scope="col">Роли</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="user in this.users" v-bind:key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.personality}}</td>
        <td>{{user.username}}</td>
        <td >
          <h5 v-for="role in user.roles" v-bind:key="role.id">{{role}}</h5>
        </td>
        <td>
          <router-link type="submit" class="btn btn-info showStudent" :to="'/admin/personalities/' + user.personality">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminUsersService from "@/components/admin/services/AdminUsersService";

export default {
  name: "adminUsers",

  data() {
    return {
      id: null,
      personality: null,
      username: '',
      role_user: '',
      role_admin: '',
      deleted: '',
      users: [],

      personalityId: null,
      usernameNew: '',
      passwordNew: '',
      roleNew: ''
    }
  },
  async mounted(){
    await this.getUsers()
  },
  methods: {
    addUser: function (){
      AdminUsersService.postUser(this.personalityId, this.usernameNew, this.passwordNew, this.roleNew)
    },
    getUsers: function (){
      AdminUsersService.getUsers().then((response) => {
        this.users = response.data
      })
    },
    findUsers: function () {
      AdminUsersService.filterUsers(this.id, this.personality, this.username, this.role_user, this.role_admin)
          .then((response) => {
            this.users = response.data
          })
    }
  }
}
</script>

<style scoped>

</style>