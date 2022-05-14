<template>
  <div>
    <h5 v-if="postStatusResponse != null">{{postStatus}}</h5>
    <form v-on:submit.prevent="addPersonality">
      <input type="text" v-model="newSecondName" name="second_name" placeholder="Фамилия"/>
      <input type="text" v-model="newFirstName" name="first_name" placeholder="Имя"/>
      <input type="text" v-model="newMiddleName" name="middle_name" placeholder="Отчество"/>
      <input type="email" v-model="newEmail" name="email" placeholder="Email"/>
      <input type="submit" class="btn btn-primary addPersonality" value="Создать">
    </form>
    <form v-on:submit.prevent="findPersonalities">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="second_name" name="second_name" placeholder="Фамилия"/>
      <input type="text" v-model="first_name" name="first_name" placeholder="Имя"/>
      <input type="text" v-model="middle_name" name="middle_name" placeholder="Отчество"/>
      <input type="submit" class="btn btn-secondary findPersonalities" value="Найти">
    </form>
    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Фамилия</th>
      <th scope="col">Имя</th>
      <th scope="col">Отчество</th>
      <th scope="col">Email</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="personality in this.personalities" v-bind:key="personality.id">
        <td>{{personality.id}}</td>
        <td>{{personality.secondName}}</td>
        <td >{{personality.firstName}}</td>
        <td >{{personality.middleName}}</td>
        <td >{{personality.email}}</td>
        <td>
            <router-link type="submit" class="btn btn-info" :to="'/admin/personalities/' + personality.id" >Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import AdminPersonalitiesService from "@/components/admin/services/AdminPersonalitiesService";

export default {
  name: "adminPersonalities",
  data() {
    return {
      id: null,
      first_name:'',
      second_name:'',
      middle_name:'',
      email:'',
      deleted:'',
      personalities: [],

      newFirstName:'',
      newSecondName:'',
      newMiddleName:'',
      newEmail:'',

      postStatus:'',
      postStatusResponse: null
    }
  },
  async mounted(){
    await this.getPersonalities()
  },
  methods: {
    addPersonality: function (){
      AdminPersonalitiesService.postPersonality(this.newFirstName, this.newSecondName, this.newMiddleName, this.newEmail)
          .then((response) => {
        this.postStatusResponse = response.data
        this.postStatus = this.postStatusResponse? 'Запись успешно добавлена':'Не удалось добавить запись'
      })
    },
    getPersonalities: function (){
      AdminPersonalitiesService.getPersonalities().then((response) => {
        this.personalities = response.data
      })
    },
    findPersonalities: function () {
      AdminPersonalitiesService.filterPersonalities(this.id, this.first_name, this.second_name, this.middle_name)
          .then((response) => {
        this.personalities = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>