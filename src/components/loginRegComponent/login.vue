<template>
  <div class="login">
    <el-form ref="loginform" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onLogin('loginform')" class="btn" plain>登录</el-button>
        <el-button @click="$emit('UpdateLogin',false)" class="btn">新人注册！</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blue" },
          { min: 3, max: 18, message: "长度在3-18之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blue" },
          { min: 3, max: 18, message: "长度在3-18之间", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    onLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userName = this.form.userName;
          let password = this.form.password;
          let data = { userName, password };
          this.axios
            .post("/account/userLogin", data)
            .then(
              res => {
                if (res && res.status == 200) {
                  this.$message("登录成功！");
                  let token = res.data.data;
                  let user = res.data.user;
                  console.log(user);
                  this.$store.dispatch("login", { token, user });
                  this.$router.push("/userInfo");
                }
              },
              err => {
                console.log(err);
                if (err && err.response && err.response.status == 403) {
                  return this.axios.post("/account/managerLogin", data);
                } else {
                  throw 1;
                }
              }
            )
            .then(res => {
              if (res && res.status == 200) {
                this.$message("管理员登录成功！");
                // console.log(res);
                let token = res.data.data;
                let user = res.data.user;

                this.$store.dispatch("login", { token, user });
                this.$router.push("/userInfo");
              }
            })
            .catch(err => {
              console.log(err);
              if (err == 1 || err.response.status == 403) {
                this.$message.error("用户名或密码错误，请重试！");
              }
              console.log(err);
            });
        } else {
          this.$message.error("检查一下输入格式！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  //   background: radial-gradient(rgb(89, 69, 94), black);
  //   padding: 6em 3em 6em 3em;

  .el-form {
    .el-form-item {
      @media screen and(max-width: 768px) {
        .btn {
          display: block;
          margin: 0;
          margin-bottom: 1em;
        }
      }
    }
  }
}
</style>
