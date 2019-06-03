<template>
 <!-- 添加一个根元素 -->
  <el-card>
       <!-- 添加一个面包屑导航 -->
    <BreadNav :navone="'权限管理'" :navtwo="'角色列表'" />
    <!-- 添加一个按钮 -->
    <el-row class="myrow">
      <el-col :span="4">
        <el-button plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 添加一个表格 -->
    <el-table :border="true" :data="rolesList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 外层行 -->
          <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag closable>{{item1.authName}}</el-tag> <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
                <el-row v-for="(item2, index2) in item1.children" :key="index2">
            <!-- 二级权限 -->
            <el-col :span="5">
              <el-tag closable type="success">{{item2.authName}}</el-tag> <i class="el-icon-arrow-right"></i>
            </el-col>
            <!-- 三级权限 -->
            <el-col :span="19">
                <el-tag type="warning" class="mytag3" closable v-for="(item3, index3) in item2.children" :key="index3">{{item3.authName}}</el-tag>
                 <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
//引入面包屑导航
import BreadNav from '../layout/breadnav/breadnav.vue'

export default {
  data() {
    return {
      rolesList: []
    };
  },
  methods: {
    //获取所有角色数据
    async getRolesList() {
      let res = await this.$http.get("/roles");
      let { data, meta } = res.data;
      if (meta.status === 200) {
        this.rolesList = data;
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getRolesList();
  },
  //添加组件
  components: {
     BreadNav //面包屑导航
  }
};
</script>

<style scoped>
.myrow {
  margin-top: 20px;
}
.mytag3 {
    margin-right: 10px;
    margin-bottom: 10px;
}
</stylec>
