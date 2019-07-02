<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="30">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="keywords">
          <el-button slot="append" icon="el-icon-search" @click="seachUserInfo"></el-button>
        </el-input>
      </el-col>
      <el-button type="success" plain @click="changeDialogVisible">添加用户</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!-- //   <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>-->
        <template v-slot="{row}">
          <el-switch
            v-model="row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeSwitch(row.id,row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini" @click="changeEditDialogVisible(row.id)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini" v-model="row.id" @click="delUserData(row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="success" plain size="mini">
            <i class="el-icon-check"></i>
            <span>分配角色</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagesize"
      @current-change="handleCurrentChange"
      :total="total"
      :current-page="currentPage"
    ></el-pagination>
    <!-- 增加模态框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="addUserData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改模态框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form
        ref="editform"
        :model="editform"
        label-width="100px"
        :rules="editUserRules"
        class="addUserData"
      >
        <el-form-item label="用户名" prop="username">
          <el-tag type="info" v-text="editform.username"></el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pagesize: 3,
      keywords: "",
      dialogVisible: false,
      editDialogVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editform: {
        id: 0,
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在6 到 15 个字符",
            trigger: "change"
          }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "电话号码格式不正确"
          }
        ]
      },
      editUserRules: {
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "邮箱格式不正确",
            trigger: "change"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    console.log(localStorage.getItem("token"));
    // axios({
    //   url: "http://localhost:8888/api/private/v1/users",
    //   method: "get",
    //   headers: { Authorization: localStorage.getItem("token") },
    //   params: { pagenum: 1, pagesize: 5 }
    // }).then(({ data: { data, meta } }) => {
    //   if (meta.status === 200) {
    //     console.log(data);
    //     this.tableData = data.users;
    //   }
    // });
    //特点，await后面接的是async函数，如何将axios变为async函数
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let res = await axios({
        url: "http://localhost:8888/api/private/v1/users",
        method: "get",
        headers: { Authorization: localStorage.getItem("token") },
        params: {
          query: this.keywords,
          pagenum: this.currentPage,
          pagesize: this.pagesize
        }
      });

      let {
        data: { data, meta }
      } = res;
      console.log(data);
      this.tableData = data.users;
      // this.currentPage = data.pagenum;
      this.total = data.total;
      console.log(data.total);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getTableData();
    },
    async delUserData(id) {
      console.log(id);
      await axios({
        url: `/users/${id}`,
        method: "delete"
      });

      this.getTableData();
    },
    async changeSwitch(id, type) {
      console.log(type);
      let res = await axios({
        url: `users/${id}/state/${type}`,
        method: "put"
      });
      let {
        data: { data, meta }
      } = res;
      if (meta.status === 200) {
        this.getTableData();
      }
    },
    seachUserInfo() {
      this.getTableData();
    },
    changeDialogVisible() {
      this.dialogVisible = true;
      console.log(this.dialogVisible);
    },
    async changeEditDialogVisible(id) {
      this.editDialogVisible = true;
      let res = await axios({
        url: `users/${id}`,
        method: "get"
      });
      console.log(res);
      let {
        data: { data, meta }
      } = res;
      if (meta.status === 200) {
        this.editform.id = data.id;
        this.editform.username = data.username;
        this.editform.password = data.password;
        this.editform.email = data.email ? data.email : "";
        console.log(data.email);
        this.editform.mobile = data.mobile ? data.mobile : "";
      }
      this.getTableData();
    },
    async editUserData() {
      let valid = await this.$refs["editform"].validate();

      if (valid) {
        let res = await axios({
          url: `users/${this.editform.id}`,
          method: "put",
          data: {
            mobile: this.editform.mobile,
            email: this.editform.email
          }
        });
        console.log(res);
        let {
          data: { data, meta }
        } = res;

        if (meta.status === 200) {
          this.editDialogVisible = false;
          this.getTableData();
        }
      } else {
        return false;
      }
    },
    async addUserData() {
      let valid = await this.$refs["form"].validate();

      if (valid) {
        let res = await axios({
          url: "users",
          method: "post",
          data: {
            username: this.form.username,
            password: this.form.password,
            email: this.form.email,
            mobile: this.form.mobile
          }
        });
        console.log(res);
        let {
          data: { data, meta }
        } = res;

        if (meta.status === 201) {
          this.dialogVisible = false;
          this.getTableData();
        }
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.el-main .el-breadcrumb {
  height: 50px;
  font-size: 16px;
  padding-left: 10px;
  background-color: #d4dae0;
  line-height: 50px;
}
</style>

