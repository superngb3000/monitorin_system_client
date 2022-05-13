<template>
  <div id="admin">
    <AdminNav/>
    <router-view/>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav";
export default {
  name: "AdminPage",
  components: { AdminNav}
}
</script>

<style scoped>

</style>