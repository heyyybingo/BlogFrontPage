<template>
  <div class="tabbarLinkList">
    <a v-for="(item,index) in links" :key="index" @click="trigger(item.path,item.here)">
      <i class="iconfont" :class="item.icon"></i>
      {{item.name}}
    </a>
    <a @click="$router.push('/loginReg')" v-if="!$store.getters.isLogin">登录/注册</a>
    <a @click="$router.push('/userInfo')" v-if="$store.getters.isLogin">个人信息</a>
    <a @click="logout" v-if="$store.getters.isLogin">退出登录</a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      links: [
        { name: "首页", icon: "icon-shouye", path: "/Home", here: true },
        { name: "Demo", icon: "icon-daima", path: "/Demo", here: true },
        {
          name: "Github",
          icon: "icon-github",
          path: "https://github.com/heyyybingo",
          here: false
        },
        {
          name: "留言板",
          icon: "icon-huabanfuben",
          path: "/msBoard",
          here: true
        }
      ]
    };
  },
  components: {},
  methods: {
    trigger(path, here) {
      console.log(path, here);
      if (here) {
        this.$router.push(path);
      } else {
        window.open(path);
      }
    },
    logout() {
      this.$router.push("/loginReg");
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.tabbarLinkList {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  a {
    color: white;
    margin: 0 1em;
    cursor: pointer;
    padding: 0.3rem;
    transition: all 1s ease;

    &:hover {
      color: lightslategray;
      border-radius: 0.3em;
      background-color: rgb(68, 65, 65);
    }
  }
}
</style>
