<template>
  <div class="health-side">
    <el-row>
      <el-col>
        <el-menu default-active="1"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu v-for="(menu,index) in clickMenu.children" :key="menu.id" :index="index+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{menu.title}}</span>
            </template>
            <template v-if="menu">
              <el-menu-item-group>
                <el-menu-item
                  :index="index+'-'+subIndex"
                  v-for="(item,subIndex) in menu.children"
                  :key="item.id"
                  :route="item.url" @click.native="handleClick(item)">
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
    data() {
      return {
        localMenu: this.clickMenu
      }
    },
    computed: {
      ...mapGetters([
        'clickMenu'
      ])
    },
    methods: {
      handleOpen() {
      },
      handleClose() {
      },
      /** 点击事件会增加panel*/
      handleClick(item) {
        this.$store.commit('ADD_TAB', {
          title: item.title,
          id: item.id,
          icon: item.icon
        })
        this.$store.commit('CHANGE_TAB', item.title)
        if (!item.url || item.url === '') {
          this.$notify({
            title: '警告',
            message: '请给当前按钮分配菜单',
            type: 'warning',
            offset: 100,
            duration: 2000
          });
        } else {
          this.$router.push(item.url)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "index";
</style>
