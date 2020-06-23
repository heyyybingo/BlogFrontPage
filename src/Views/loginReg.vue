<template>
  <div class="loginReg">
    <el-row>
      <el-col :xs="1" :sm="4" :lg="8">
        <span></span>
      </el-col>
      <el-col :xs="22" :sm="16" :lg="8">
        <login v-show="login" @UpdateLogin="UpdateLogin" class="forms"></login>
        <register v-show="!login" @UpdateLogin="UpdateLogin" class="forms"></register>
      </el-col>
      <el-col :xs="1" :sm="4" :lg="8">
        <span></span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import login from "../components/loginRegComponent/login.vue";
import register from "../components/loginRegComponent/register.vue";
export default {
  name: "",
  data() {
    return {
      login: true
    };
  },
  components: { login, register },
  methods: {
    UpdateLogin(islogin) {
      this.login = islogin;
    }
  }
};
</script>

<style lang="scss" scoped>
.loginReg {
  box-sizing: border-box;
  height: 100%;
  .el-row {
    display: flex;
    height: 100%;
    align-items: center;
    .el-col {
      .forms {
        padding: 3em 3em 3em 3em;
        background: linear-gradient(
          rgba($color: white, $alpha: 1),
          rgba($color: white, $alpha: 0.8)
        );
      }
    }
  }
}
</style>
