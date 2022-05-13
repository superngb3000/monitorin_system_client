<template>
  <div>
    <form v-on:submit.prevent="findGroups">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="name" name="name" placeholder="Имя группы"/>
      <input type="submit" class="btn btn-primary findGroups" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">Имя группы</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="group in this.groups" v-bind:key="group.id">
        <td>{{group.name}}</td>
        <td>
          <router-link type="submit" class="btn btn-primary" :to="'/teacher/group/' + group.id">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TeacherGroupsService from "@/components/teacher/services/TeacherGroupsService";

export default {
  name: "TeacherGroups",
  data() {
    return {
      id: null,
      post_name: '',
      name: '',
      groups: []
    }
  },
  async mounted(){
    await this.getGroups()
  },
  methods: {
    getGroups: function (){

      TeacherGroupsService.getGroups().then((response) => {
        this.groups = response.data
      })
    },
    findGroups: function () {
      TeacherGroupsService.filterGroups(this.id, this.name).then(response => {
        this.groups = response.data
        console.log(this.groups)
      })
    }
  }
}
</script>

<style scoped>

</style>