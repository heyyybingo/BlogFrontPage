<template>
  <div class="search">
    <div v-show="!searched" class="searchBox">
      <el-input placeholder="请输入搜索内容" v-model="content"></el-input>
      <el-button icon="el-icon-search" type="primary" plain @click="onSearch"></el-button>
    </div>
    <el-button
      icon="el-icon-search"
      type="danger"
      style="width:100%;"
      plain
      ref="Cancel"
      @click="onCancel"
      :class="{Searching:searched,notSearching:!searched}"
    >取消搜索</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: ["searched"],
  data() {
    return {
      content: ""
    };
  },
  components: {},
  methods: {
    onSearch() {
      let title = this.content;
      let simpleContent = this.content;
      let tags = this.content;
      let params = { title, simpleContent, tags };
      // console.log("search", params);
      // console.log("search");

      this.$emit("UpdateSearchParams", params);
      this.$emit("UpdateSearch", true);
    },
    onCancel() {
      // 添加动画
      this.$refs.Cancel.$el.classList.add("notSearchAni");

      setTimeout(() => {
        // 删除这个动画
        console.log("1sec helloword");
        this.$refs.Cancel.$el.classList.remove("notSearchAni");
        // 1秒最后要变成display:none

        this.$emit("UpdateSearch", false);

        console.log("emit");
      }, 1000);
    }
  },
  mounted() {
    this.$refs.Cancel.$el.classList.add("notSearching");
  }
};
</script>

<style lang="scss" scoped>
.search {
  background-color: white;

  // justify-content: space-around;
  // align-items: center;
  border-radius: 3px;
  z-index: 100;
  .searchBox {
    animation: boxIN 1s;
    display: flex;
  }
  @keyframes boxIN {
    0% {
      transform: scaleX(0);
    }
  }
  .Searching {
    animation: searchIN 1s;
  }
  .notSearching {
    display: none;
  }
  .notSearchAni {
    animation: searchOUT 1s;
  }
  @keyframes searchIN {
    0% {
      transform: scale(0.5, 0.5);
    }
    50% {
      transform: scale(1.2, 1.2);
    }
  }
  @keyframes searchOUT {
    0% {
      transform: scale(1.2, 1.2);
    }
    100% {
      transform: scale(0, 0);
    }
  }
}
</style>
