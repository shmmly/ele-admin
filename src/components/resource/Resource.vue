<template>
  <div>
    <el-form :inline="true" :model="condition" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="condition.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="conditionSubmit" icon="el-icon-search">
          查询
        </el-button>
        <el-button type="primary" @click="addUserInfo" icon="el-icon-edit">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="formatData" stripe border :row-style="showRow">
      <el-table-column align="center"
                       type="selection">
      </el-table-column>
      <el-table-column prop="text"
                       align="center" label="名称">
        <template slot-scope="scope">
          <span v-for="item in scope.row._level" class="ms-tree-space" :key="item"></span>
          <span class="tree-ctrl" v-if="iconShow(scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i>
          </span>
          {{scope.row.text}}
        </template>
      </el-table-column>
      <el-table-column prop="type"
                       align="center" label="资源类别">
        <!--这里我可以使用scope调用 row的数据-->
        <template slot-scope="scope">
          <div v-if="scope.row.type===0">
            <span>菜单</span>
          </div>
          <div v-else>
            <span>按钮</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="url"
                       align="center" label="资源地址">
      </el-table-column>
      <el-table-column prop="state"
                       align="center" label="是否展开">
        <!--这里我可以使用scope调用 row的数据-->
        <template slot-scope="scope">
          <div v-if="scope.row.state===0">
            <span>展开</span>
          </div>
          <div v-else>
            <span>不展开</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="success" size="small">编辑</el-button>
          <el-button @click="handleRemove(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--提交的diolog-->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="40%"
               @close="closeDialog">
      <el-form :model="permission" label-width="80px"
               size="mini" :rules="dialogRules"
               ref="dialogForm"
               status-icon>
        <el-form-item label="名称" prop="name">
          <el-input v-model="permission.text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源类别" prop="type">
          <el-select v-model="permission.type" placeholder="请选择资源类别">
            <el-option label="菜单" value="0"/>
            <el-option label="按钮" value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="资源地址" prop="url">
          <el-input v-model="permission.url" auto-complete="off"></el-input>
        </el-form-item>

        <!--这里使用v-for来渲染select选项 这里渲染为一个树形结构 -->
        <el-form-item label="上级菜单" prop="">
          <el-select v-model="permission.parentid" placeholder="请选择组织机构">
            <el-option v-for="(data,index) in selectedData"
                       :key="data.id" :label="data.text" :value="data.id" :style="showOptionGroup(data)">
              <span v-for="item in data._level" class="ms-tree-space" :key="item"></span>
              <span class="tree-ctrl" v-if="iconShow(data)" @click.stop="toggleSelectExpanded(index)">
                 <i v-if="!data._expanded" class="el-icon-plus"></i>
                  <i v-else class="el-icon-minus"></i>
              </span>
              {{data.text}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否展开" prop="state">
          <el-select v-model="permission.state" placeholder="请选择是否展开">
            <el-option label="展开" value="open"/>
            <el-option label="不展开" value="closed"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--分页-->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    getPermissions,
    getUserInfoById,
    editUserInfo,
    removeUserInfo,
    getUserInfoByUsername
  } from '../../api/permission'
  import dataToArray from "../../utils/dataToArray"

  export default {
    name: "Resource",
    data() {
      return {
        permissions: [],
        permission: {
          text: '',
          type: '',
          parentid: '',
          url: '',
          state: ''
        },
        dialogFormVisible: false,
        condition: {},
        dialogRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 5, message: '长度在2-3个字符', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur'}
          ],
          gender: {required: true, message: '请输入性别', trigger: 'change'},
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {pattern: '^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\\d{8})$', message: '手机号格式错误', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
          ]
        },
        currentPage: 1,
        totalPageSize: 1,
        selectedData: [],
      }
    },
    methods: {
      async getPermissions() {
        this.permissions = (await getPermissions()).rows
      },
      /** 打开dialog  将当前的row数据加载到form中 */
      handleEdit(row) {
        this.dialogFormVisible = !this.dialogFormVisible
        this.permission = {...row}
      },
      handleRemove(row) {
        this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
          confirmButtonClass: 'success',
          // cancelButtonText:'取消'
          cancelButtonClass: '',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: "已取消删除"
          })
        })
      },
      /** 查询条件的提交，这里不可以不提交，因为获取的数据是分页的*/
      async conditionSubmit() {
        this.userInfos = []
        this.userInfos.push(await getUserInfoByUsername(this.condition.name))
        this.totalPageSize = this.userInfos.length
      },
      /** 新增用户 调用api 根据返回的response 调用message 给出对应的提示消息*/
      addUserInfo() {
        this.dialogFormVisible = !this.dialogFormVisible

      },
      /** 关闭dialog的时候，清空表单还有验证消息 */
      closeDialog() {
        this.$refs['dialogForm'].resetFields()
      },
      /** 当前页数发送变化
       *  调用api传入当前页为参数
       * */
      handleCurrentChange(currentPage) {

      },
      showRow({row}) {
        // 判断当前行是否有父级 如果有父级那么父级是否有_expanded和_show
        const show = (row.parent ? (row.parent._expanded && row.parent._show) : true)
        row._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        const record = this.formatData[trIndex]
        record._expanded = !record._expanded
      },
      // 图标显示
      iconShow(record) {
        return (record.children && record.children.length > 0)
      },
      showOptionGroup(data) {
        const show = (data.parent ? (data.parent._expanded && data.parent._show) : true)
        data._show = show
        return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
      },
      //切换select
      toggleSelectExpanded: function (trIndex) {
        const record = this.selectedData[trIndex]
        record._expanded = !record._expanded
      },
    },
    computed: {
      formatData: function () {
        let tmp
        if (!Array.isArray(this.permissions)) {
          tmp = [this.permissions]
        } else {
          tmp = this.permissions
        }
        this.selectedData = dataToArray(tmp)
        return dataToArray(tmp)
      },

    },
    created() {
      this.getPermissions()
    }


  }
</script>

<style scoped lang="less">
  @import "index";
</style>
