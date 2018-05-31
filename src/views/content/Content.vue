<template>
  <el-tabs v-model="activeTab" type="border-card"
           class="health-content"
           @tab-remove="removeTab"
           :value="activeTab">
    <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date">系统首页</i>
        </span>
    </el-tab-pane>
    <el-tab-pane closable v-for="tab in tabs"
                 :key="tab.id"
                 :name="tab.title">
        <span slot="label">
          <i :class="tab.icon">{{tab.title}}</i>
        </span>
      <!--这个里面是对表格的一系列操作功能-->
      <router-view name="pane"/>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Content",
    /**
     *  监听selectedTab
     *  发送变化就提交mutations
     *  改变state中的数据
     * */
    computed: {
      ...mapGetters([
        'tabs'
      ]),
      /** 活动的窗口 */
      activeTab: {
        get: function () {
          return this.$store.state.global.activeTab
        },
        set: function (newValue) {
          this.$store.commit('CHANGE_TAB', newValue)
        }
      }

    },
    methods: {
      removeTab(name) {
        console.log(name)
        this.$store.commit('REMOVE_TAB', name)
      }
    }

  }
</script>

<style scoped lang="less">
  @import "index";
</style>
