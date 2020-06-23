<template>
  <div class="container">
    <myheader class="header"></myheader>
    <!-- <article-list class="main"></article-list> -->
    <!-- <art-detail class="main"></art-detail> -->
    <router-view class="main"></router-view>

    <div style="background-color: white;">this is footer</div>
  </div>
</template>

<script type="text/ecmascript-6">
import myheader from "./components/myHeader/myheader.vue";
import articleList from "./Views/articleList.vue";
import artDetail from "./Views/artDetail.vue";
import msBoard from "./Views/msBoard.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: { myheader, articleList, artDetail, msBoard },
  methods: {}
};
</script>

<style lang="scss" >
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
  background: url("/src/lib/image/bgc1.gif") center;
}
.container {
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    animation: headIn 1s;
    height: 3em;
    z-index: 999;
  }
  .main {
    padding-top: 5em;
    animation: mainIn 1s;
    min-height: 100%;
  }
  @keyframes headIn {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes mainIn {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
    }
  }
}

@media screen and(max-width:768px) {
  body,
  html {
    font-size: 0.8em;
  }
}
</style>
