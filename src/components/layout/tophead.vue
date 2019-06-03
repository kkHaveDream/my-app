<template>
  <el-row>
    <el-col class="mycol" :span="4">
      <div class="grid-content bg-purple">
        <img src="../../../static/logo.png" alt>
      </div>
    </el-col>
    <el-col class="mycol" :span="16">
      <div class="grid-content bg-purple-light">
        <h1>电商后台管理系统</h1>
      </div>
    </el-col>
    <el-col class="mycol logout" :span="4">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="logout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    logout() {
      //退出登录
      this.$confirm("您确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!"
        });
        //1.清除token
        localStorage.removeItem("token");
        //2.页面跳转到登录界面
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style>
.mycol {
  height: 60px;
  text-align: center;
}

.logout {
  text-align: right;
}
</style>
