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
    <el-table :data="userInfos" stripe border>
      <el-table-column align="center"
                       type="selection">
      </el-table-column>
      <el-table-column prop="username"
                       align="center" label="用户名">
      </el-table-column>
      <el-table-column prop="pwd"
                       align="center" label="密码">
      </el-table-column>
      <el-table-column prop="gender"
                       align="center" label="性别">
      </el-table-column>
      <el-table-column prop="organization.name"
                       align="center" label="组织机构">
      </el-table-column>
      <el-table-column prop="phone"
                       align="center" label="手机号">
      </el-table-column>
      <el-table-column prop="email"
                       align="center" label="邮箱">
      </el-table-column>
      <el-table-column prop="role.name"
                       align="center" label="角色">
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
      <el-form :model="userInfo" label-width="80px"
               size="mini" :rules="dialogRules"
               ref="dialogForm"
               status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="userInfo.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="userInfo.gender" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织机构" prop="">
          <el-select v-model="userInfo.region" placeholder="请选择组织机构">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" auto-complete="off"></el-input>
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
    getUserInfo,
    getUserInfoById,
    editUserInfo,
    removeUserInfo,
    getUserInfoByUsername
  } from '../../api/userInfo'

  export default {
    name: "UserInfo",
    data() {
      return {
        userInfos: [],
        userInfo: {
          username: '',
          pwd: '',
          gender: '',
          phone: '',
          email: ''
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
        totalPageSize: 1
      }
    },
    methods: {
      async getUserInfos() {
        this.userInfos = (await getUserInfo()).rows
      },
      /** 打开dialog  将当前的row数据加载到form中 */
      handleEdit(row) {
        this.dialogFormVisible = !this.dialogFormVisible
        this.userInfo = {...row}
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

      }

    },
    created() {
      this.getUserInfos()
    }


  }
</script>

<style scoped lang="less">
  @import "index";
</style>
