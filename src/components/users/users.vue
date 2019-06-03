<template>
  <!-- 添加一个根组件  卡片 -->
  <el-card>
    <!-- 添加一个面包屑导航 -->
    <BreadNav :navone="'用户管理'" :navtwo="'用户列表'" />
    <!-- 添加一个搜索框 -->
    <el-row class="myrow">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" @click="searchData" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain @click="showAdd">新增用户</el-button>
      </el-col>
    </el-row>
    <!-- 添加一个表格 -->
    <el-table :border="true" :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch @change="changeStu(scope.row.id, scope.row.mg_state)" v-model="scope.row.mg_state" active-color="#0f0" inactive-color="#f00"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="getEdit(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="mydelete(scope.row.id)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            plain
            size="mini"
            @click="check(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增用户对话框 -->
    <el-dialog title="新增用户" :visible.sync="addDialog">
      <el-form ref="addForm" :rules="rules" :model="formObj">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="formObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="postAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增修改对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialog">
      <el-form ref="addForm" :rules="rules" :model="formObj">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="formObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="formObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="postEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增分配角色对话框 -->
    <el-dialog title="角色分配" :visible.sync="checkDialog">
      <el-form ref="addForm" :model="formObj">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          {{formObj.username}}
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="formObj.rid" placeholder="请选择">
            <el-option :value="-1" label="请选择"></el-option>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="checkDialog = false">取 消</el-button>
        <el-button type="primary" @click="postCheck">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
//引入面包屑导航
import BreadNav from '../layout/breadnav/breadnav.vue'

export default {
  data() {
    return {
      search: "", //搜索数据
      pagenum: 1, //当前页
      pagesize: 20, //当前页数量
      addDialog: false, //显示隐藏新增对话框
      editDialog: false, //显示隐藏修改对话框
      checkDialog: false, //显示隐藏角色分配对话框
      formLabelWidth: "100px", //设置对话框宽度
      tableData: [], //表格参数
      options: [], //下拉框参数
      formObj: {//新增用户参数
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {//表单验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    //获取所有用户数据,渲染到页面
    getUserList() {
      //得到 token
      let token = localStorage.getItem("token");
      this.$http
        .get("/users", {
          // headers: {
          //     //添加 token
          //     Authorization: token
          // },
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.search
          }
        })
        .then(res => {
          // 接收参数
          let { data, meta } = res.data;
          if (meta.status === 200) {
            // 将数据保存到
            this.tableData = data.users;
          }
        });
    },
    //显示新增用户对话框
    showAdd() {
      this.addDialog = true;
    },
    //提交新增数据
    postAdd() {
      //1.验证数据是否合法
      this.$refs.addForm.validate(vali => {
        if (vali) {
          //2. 将数据提交到服务器
          this.$http.post("/users", {
             username: this.formObj.username,
             password: this.formObj.password,
             email: this.formObj.email,
             mobile: this.formObj.mobile
          }).then(res => {
            //3.接收结果,重新渲染
            let { meta } = res.data;
            if (meta.status === 201) {
              this.$message({
                message: meta.msg,
                type: "success"
              });
              //重新渲染
              this.getUserList();
              //关闭新增窗口
              this.addDialog = false;
              //清空数据
              this.formObj = {
                username: "",
                password: "",
                email: "",
                mobile: ""
              };
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$message.error("请填写正确信息");
        }
      });
    },
    //搜索数据
    searchData() {
      this.getUserList();
    },
    //获取修改对话框
    getEdit(id) {
      //显示修改对话框
      this.editDialog = true;
      //根据 id 发送请求
      this.$http.get(`/users/${id}`).then(res => {
        //解构函数
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.formObj = data;
        }
      });
    },
    //提交修改数据
    postEdit() {
      this.$http
        .put(`/users/${this.formObj.id}`, {
          email: this.formObj.email,
          mobile: this.formObj.mobile
        })
        .then(res => {
          let { meta } = res.data;
          if (meta.status === 200) {
            this.$message({
              type: "success",
              message: meta.msg
            });
            this.editDialog = false;
            //重新渲染
            this.getUserList();
          } else {
            this.$message.error(meta.msg);
          }
        });
    },
    //删除数据
    mydelete(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/users/${id}`).then(res => {
            let { meta } = res.data;
            if (meta.status === 200) {
              this.$message({
                type: "success",
                message: meta.msg
              });
              //重新渲染
              this.getUserList();
            } else {
              this.$message.error(meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //改变用户状态
    changeStu(id, state) {
      this.$http.put(`/users/${id}/state/${state}`)
      .then(res => {
        let { meta } = res.data
         if (meta.status === 200) {
              this.$message({
                type: "success",
                message: meta.msg
              });
            } else {
              this.$message.error(meta.msg);
            }
      })
    },
    //得到下拉框中的数据
    getOpetions(){
      this.$http.get('roles')
      .then(res => {
        this.options = res.data.data
      });
    },
    //分配角色
    check(id) {
      this.checkDialog = true
      this.$http.get(`/users/${id}`).then(res => {
        //解构函数
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.formObj = data;
        }else{
          this.$message.error(meta.msg)
        }
      });
    },
    //提交分配角色
    postCheck() {
      this.$http.put(`users/${this.formObj.id}/role`,{
        rid: this.formObj.rid
      }).then(res => {
        let { meta } = res.data;
          if (meta.status === 200) {
            this.$message({
              type: "success",
              message: meta.msg
            });
            this.checkDialog = false
            //重新渲染
            this.getUserList();
          } else {
            this.$message.error(meta.msg);
          }
      })
    }
  },

  //打开页面执行
  mounted() {
    //获取users中的数据
    this.getUserList();
    //得到下拉框中的数据
    this.getOpetions()
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
</style>

