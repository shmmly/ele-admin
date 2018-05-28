<template>
  <div class="health-side">
    <el-row>
      <el-col :span="4">
        <el-menu default-active="1"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu v-for="menu in clickMenu" index="menu.id" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.title}}</span>
            </template>
            <template v-if="menu.children">
              <el-menu-item-group>
                <el-menu-item index="" v-for="item in menu.children" :key="item.id">
                  {{item.title}}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "SideBar",
    computed: {
      ...mapGetters([
        'clickMenu'
      ])
    },
    methods: {
      handleOpen() {
      },
      handleClose() {
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index";
</style>
