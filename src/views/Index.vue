<template>
  <div>
    <Health-header/>
    <SideBar/>
  </div>

</template>

<script>
  import HealthHeader from '@/components/header/HealthHeader'
  import SideBar from '@/components/sidebar/SideBar'

  export default {
    name: "Index.vue",
    components: {
      HealthHeader,
      SideBar
    }
  }
</script>

<style scoped>

</style>
