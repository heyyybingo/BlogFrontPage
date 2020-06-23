<template>
  <div class="register">
    <el-form ref="regform" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" show-password prop="password">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        <el-button
          @click="onSendCode('regform')"
          size="small"
          :disabled="sendClock.sending"
        >{{this.sendClock.sending?this.sendClock.count+"后重试":"验证码"}}</el-button>
      </el-form-item>

      <el-form-item label="验证码" width="50%" prop="checkCode">
        <el-input v-model.number="form.checkCode" maxlength="4" placeholder="请输入验证码(四位数字)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onRegister('regform')" class="btn" type="primary" plain>注册</el-button>
        <el-button @click="$emit('UpdateLogin',true)" class="btn">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      sendClock: {
        sending: false,
        count: 60,
        id: null,
        message: ""
      },
      form: {
        userName: "",
        password: "",
        email: "",
        checkCode: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3-18之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在3-18之间", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请检查邮箱格式", trigger: "blur" }
        ],
        checkCode: [
          { required: true, message: "请输入验证码！", trigger: "blur" },
          // { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { type: "number", message: "验证码为4位数字", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    onSendCode(formName) {
      this.$refs[formName].validateField("email", errMsg => {
        if (errMsg) {
        } else {
          let email = this.form.email;
          let data = { email };
          this.sendClock.sending = true;
          this.sendClock.count = 60;
          this.sendClock.id = setInterval(() => {
            this.sendClock.count--;
            if (this.sendClock.count == 0) {
              this.sendClock.sending = false;
              clearInterval(this.sendClock.id);
            }
          }, 1000);
          this.axios
            .post("/account/checkMail", data)
            .then(res => {
              if (res.status == 200) {
                this.$message("验证码发送成功");
              }
            })
            .catch(err => {
              this.sendClock.sending = false;
              this.$message.error("哎呀！发生错误，请重试");
            });
        }
      });
    },
    onRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userName = this.form.userName;
          let password = this.form.password;
          let email = this.form.email;
          let checkCode = this.form.checkCode;
          let data = { userName, password, email, checkCode };
          this.axios
            .post("/account/userReg", data)
            .then(res => {
              if (res.status == 200) {
                this.$message("注册成功咯");
              }
            })
            .catch(err => {
              this.sendClock.sending = false;
              console.log(err.response);
              if (err.response.status == 403) {
                switch (err.response.data.result) {
                  case "Duplicate":
                    this.$message.error("用户名重复！请重试");
                    break;
                  case "wrong code":
                    this.$message.error("验证码错误！");
                    break;
                  default:
                    this.$message.error("Forbidden！");
                }
                return;
              }
              this.$message.error("哎呀！发生错误，请重试");
            });
        } else {
          this.$message.error("检查一下该输入的信息噢！");
          return null;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  .el-form {
    .el-form-item {
      @media screen and(max-width:768px) {
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
