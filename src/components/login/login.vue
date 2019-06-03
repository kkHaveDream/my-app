<template>
  <div class="loginbox">
    <h3>用户登录</h3>
    <el-form
      label-position="top"
      :rules="rules"
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="mybtn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户对象
      ruleForm: {
        username: "",
        password: ""
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      //判断 form 中的元素是否满足验证条件
      this.$refs.ruleForm.validate(valid => {
        //   valid 布尔值
        if (valid) {
          this.$http.post("login", this.ruleForm).then(res => {
            let { data, meta } = res.data;
            if (meta.status === 200) {
              //提示登录成功
              this.$message({
                message: meta.msg,
                type: "success"
              });
              //跳转到首页
              this.$router.push('/home')
              //将登陆中的token保存起来
              localStorage.setItem('token',res.data.data.token)
            }else {
                this.$message.error(meta.msg)
            }
          });
        } else {
          this.$message.error("用户名或密码错误");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.loginbox {
  width: 450px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  padding: 40px 40px 20px;
}
.loginbox .mybtn {
  width: 100%;
}
</style>