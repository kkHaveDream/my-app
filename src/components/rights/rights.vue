<template>
  <!-- 添加一个根元素 -->
  <el-card>
    <!-- 添加一个面包屑导航 -->
    <BreadNav :navone="'权限管理'" :navtwo="'权限列表'" />
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限管理" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
          <template slot-scope="scope">
              {{scope.row.level === '0' ? '一级' : scope.row.level === '1' ? '二级':'三级'}}
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
//引入面包屑导航
import BreadNav from '../layout/breadnav/breadnav.vue'

export default {
    data(){
        return {
            tableData: []
        }
    },
    methods: {
        //获取所有权限数据
        async getAllRight(){
            let res = await this.$http.get('rights/list')
            //解构
            let {data, meta} = res.data
            if (meta.status === 200) {
                this.tableData = data
            } else {
                this.$message.error(meta.msg)
            }
        }
    },
    mounted(){
        this.getAllRight()
    },
    //添加组件
  components: {
     BreadNav //面包屑导航
  }
};
</script>

<style>
</style>
