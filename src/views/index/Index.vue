<template>
  <div class="health-index">
    <Health-header/>
    <el-row>
      <el-col :span="4">
        <SideBar/>
      </el-col>
      <el-col :span="20">
        <Content/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import HealthHeader from '@/components/header/HealthHeader'
  import SideBar from '@/components/sidebar/SideBar'
  import Content from '@/views/Content'

  export default {
    name: "Index",
    components: {
      HealthHeader,
      SideBar,
      Content
    },
    beforeRouteEnter(to, from, next) {
      console.log('before router')
      next(vm => {
        vm.$store.dispatch('getMenu')
      })
    },
  }
</script>

<style scoped lang="less">
  @import "index";
</style>
