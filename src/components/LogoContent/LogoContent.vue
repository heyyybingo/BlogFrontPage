<template>
  <div class="logo-container">
    <i class="iconfont icon-liebiao"></i>
    <div>
      <img :src="logo" height="80%" />
      <p>heyyybingo</p>
    </div>
    <i class="iconfont icon-sousuo"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import mylogo from "../../lib/image/logo.jpg";
export default {
  name: "",
  data() {
    return {
      logo: mylogo
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  color: white;
  font-size: 2em;
  div {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .iconfont {
    cursor: pointer;
    display: none;
  }
  @media screen and(max-width:768px) {
    .iconfont {
      display: block;
    }
  }
}
</style>
