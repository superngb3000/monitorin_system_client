<template>
  <div>
    <h5 v-if="postStatusResponse != null">{{postStatus}}</h5>
    <form v-on:submit.prevent="addGroup">
      <input type="text" v-model="post_name" name="name" placeholder="Имя группы"/>
      <input type="submit" class="btn btn-primary addGroup" value="Создать">
    </form>

    <form v-on:submit.prevent="findGroups">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="name" name="name" placeholder="Имя группы"/>
      <input type="submit" class="btn btn-primary findGroups" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Имя группы</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="group in this.groups" v-bind:key="group.id">
        <td>{{group.id}}</td>
        <td>{{group.name}}</td>
        <td>
          <router-link type="submit" class="btn btn-primary" :to="'/admin/group/' + group.id">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminGroupsService from "@/components/admin/services/AdminGroupsService";

export default {
  name: "adminGroups",
  data() {
    return {
      id: null,
      post_name: '',
      name: '',
      deleted: '',
      groups: [],

      postStatus: '',
      postStatusResponse: null
    }
  },
  async mounted(){
    await this.getGroups()
  },
  methods: {
    addGroup: function (){
      AdminGroupsService.postGroup(this.post_name)
          .then(response=>{
            this.postStatusResponse = response.data
            this.postStatus = this.postStatusResponse? 'Группа успешно добавлена':'Не удалось добавить группу'
          })
    },
    getGroups: function (){
      AdminGroupsService.getGroups().then((response) => {
        this.groups = response.data
      })
    },
    findGroups: function () {
      AdminGroupsService.filterGroups(this.id, this.name).then(response => {
        this.groups = response.data
        console.log(this.groups)
      })
    }
  }
}
</script>

<style scoped>

</style>