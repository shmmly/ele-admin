<template>
  <div class="health-index">
    <Health-header/>
    <el-row class="health-content">
      <el-col :span="4" class="health-content">
        <SideBar/>
      </el-col>
      <el-col :span="20" class="health-content">
        <Content/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import HealthHeader from '@/components/header/HealthHeader'
  import SideBar from '@/components/sidebar/SideBar'
  import Content from '@/views/content/Content'

  export default {
    name: "Index",
    components: {
      HealthHeader,
      SideBar,
      Content
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.dispatch('getMenu')
      })
    },
  }
</script>

<style scoped lang="less">
  @import "index";
</style>
