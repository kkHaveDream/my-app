<template>
  <div class="mycon">
    <el-container>
      <!-- 头部区域 -->
    <el-header>
      <TopHeah/>
    </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <Aside />
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
             <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入头部组件
import TopHeah from "../layout/tophead.vue";
import Aside from "../layout/aside.vue";

export default {
  mounted() {
    //判断是否存在 token
    let token = localStorage.getItem("token");
    //判断
    if (!token) {
      //说明没有登陆,需要重新跳回 login
      this.$router.push("/login");
    }
  },
  components: {
    TopHeah,
    Aside
  }
};
</script>

<style scoped>
.mycon {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.el-container {
  height: 100%;
}

.logout a {
  text-decoration: none;
  color: green;
}

.mynenu {
  height: 100%;
}
</style>