<template>
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
        <el-switch v-model="row.type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <el-button type="primary" plain size="mini">
        <i class="el-icon-edit"></i>
      </el-button>
      <el-button type="danger" plain size="mini">
        <i class="el-icon-delete"></i>
      </el-button>
      <el-button type="success" plain size="mini">
        <i class="el-icon-check"></i>
        <span>分配角色</span>
      </el-button>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      value: false
    };
  },
  async created() {
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
      let res = await axios({
      url: "http://localhost:8888/api/private/v1/users",
      method: "get",
      headers: { Authorization: localStorage.getItem("token") },
      params: { pagenum: 1, pagesize: 5 }
        })
      let {data:{data,meta}}=res
      this.tableData = data.users
   
   
  }
};
</script>
