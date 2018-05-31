<template>
  <div class="health-head" :style="{backgroundColor:index.backgroundColor}">
    <el-row type="flex" align="middle">
      <el-col :span="1">
        <img src="../../assets/logo.png" alt="" class="health-head-logo">
      </el-col>
      <el-col :span="4">
        <p class="health-head-title">{{index.title}}</p>
      </el-col>
      <el-col :span="1" @click.native="changeMenu">
        <i :class="[toggleSide?'el-icon-arrow-left':'el-icon-arrow-right','health-head-arrows']"></i>
      </el-col>
      <!--下面应该从menus里面来获取是一个array-->
      <el-col :span="2" v-for="menu in menus" :key="menu.id" @click.native="handleClick(menu.id)">
        <p>{{menu.title}}</p>
      </el-col>
      <el-col :span="2" :offset="6">
        {{userInfo.name}}
      </el-col>
      <el-col :span="2">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color: white;font-size: 18px">
            设置 <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="2">
        注销
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    computed: {
      ...mapGetters([
        'index',
        'menus',
        'userInfo',
        'toggleSide'
      ])
    },

    methods: {
      handleClick(id) {
        this.$store.commit('CLICK_MENU', id)
      },
      changeMenu() {
        this.$store.commit('TOGGLE_SIDE')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "index";
</style>
