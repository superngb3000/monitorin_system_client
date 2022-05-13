<template>
  <div>
    <h5 v-if="postStatusResponse != null">{{postStatus}}</h5>
    <form v-on:submit.prevent="addSubject">
      <input type="text" v-model="post_name" name="name" placeholder="Название предмета"/>
      <input type="submit" class="btn btn-primary addSubject" value="Создать">
    </form>

    <form v-on:submit.prevent="findSubjects">
      <input type="number" v-model="id" name="id" placeholder="ID"/>
      <input type="text" v-model="name" name="name" placeholder="Название предмета"/>
      <input type="submit" class="btn btn-primary findSubjects" value="Найти">
    </form>

    <table class="table table-bordered">
      <thead>
      <th scope="col">ID</th>
      <th scope="col">Название предмета</th>
      <th scope="col"></th>
      </thead>
      <tbody>
      <tr v-for="subject in this.subjects" v-bind:key="subject.id">
        <td>{{subject.id}}</td>
        <td>{{subject.name}}</td>
        <td>
          <router-link type="submit" class="btn btn-primary showSubject" :to="'/admin/subject/' + subject.id">Подробнее</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminSubjectsService from "@/components/admin/services/AdminSubjectsService";

export default {
  name: "adminSubjects",
  data() {
    return {
      id: null,
      post_name: '',
      name: '',
      group_id: null,
      teacher_id: null,
      deleted: '',
      subjects: [],

      postStatus: '',
      postStatusResponse: null
    }
  },
  async mounted(){
    await this.getSubjects()
  },
  methods: {
    addSubject: function (){
      AdminSubjectsService.postSubject(this.post_name).then((response) => {
        this.postStatusResponse = response.data
        this.postStatus = this.postStatusResponse? 'Предмет успешно добавлен':'Не удалось добавить предмет'
      })
    },
    getSubjects: function (){
      AdminSubjectsService.getSubjects().then((response) => {
        this.subjects = response.data
      })
    },
    findSubjects: function () {
      AdminSubjectsService.filterSubjects(this.id, this.name).then((response) => {
        this.subjects = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>