<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center" align="middle">
        <el-col :span="6">
          <img src="../assets/logo.png" alt />
        </el-col>
        <el-col>
          <div class="header-center">品优购后台管理系统</div>
        </el-col>
        <el-col :span="6">
          <div class="header-right">
            <span>欢迎39期星耀会员</span>
            <a @click="logOut">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-col>
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>

              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>分类参数</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品分类</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>

              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="1-1-1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>统计报表</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  methods: {
   logOut(){
     localStorage.removeItem('token')
     this.$router.push('/login')
   }
  }
};
</script>


<style>
.el-container .el-header {
  padding: 0;
  margin: 0;
  background-color: #b3c1cd;
}
.el-container .el-header .el-row .el-col img {
  width: 200px;
}
.header-center {
  font-size: 28px;
  color: #fff;
  font-weight: bolder;
  text-align: center;
}
.header-right {
  text-align: right;
  padding-right: 10px;
}
.header-right span {
  text-align: right;

  font-weight: bolder;
}
.header-right a {
  color: orange;
  font-weight: bolder;
}
.el-container {
  height: 100%;
}
.el-container .el-aside {
  height: 100%;
}
.el-container .el-aside .el-col {
  height: 100%;
}
.el-container .el-aside .el-col .el-menu {
  height: 100%;
}
</style>

