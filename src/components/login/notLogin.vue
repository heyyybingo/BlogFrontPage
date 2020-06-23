<template>
  <div class="notLogin-container">
    <h3>还没登录！！！</h3>
    <a @click="$router.push('/loginReg')">点击登录</a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.notLogin-container {
  // display: flex;
  // justify-content: center;
  text-align: center;
  background-color: white;
  $btn-width: 125px;
  $btn-height: 40px;
  $btn-color: #acacac;
  $btn-color-dark: darken($btn-color, 25%);
  $btn-height-small: $btn-height/2;
  $btn-width-small: $btn-width/2;
  a {
    margin: 0 auto;
    cursor: pointer;
    display: block;
    position: relative;
    height: $btn-height;
    width: $btn-width;
    overflow: hidden;
    color: $btn-color;
    border: 1px solid currentColor;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    line-height: $btn-height;
    border-radius: 3px;
    z-index: 0;
    &::before {
      content: "";
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
    &::before {
      background-color: $btn-color-dark;
      transform: translate(-100%, -100%);
      transition: 0.3s all ease;
    }
    &:hover {
      color: white;
      &::before {
        transform: translateX(0);
      }
    }
  }
}
</style>
