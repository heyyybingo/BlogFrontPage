<template>
  <div class="tagList" :class="{tagListDisable:searched}">
    <div class="list-title">
      <div class="left">文章标签</div>
      <div class="right" @click="onMore" v-if="normal">更多</div>
      <div class="right" @click="normal=true" v-if="!normal">收起</div>
    </div>

    <div class="content" ref="content" :class="{onMore:!normal}">
      <div v-if="tags.length<=0" style="text-align:center;">暂无数据</div>
      <el-tag
        v-for="(item) in tags"
        :key="item._id"
        :color="tagColor(item.tagName)"
        @click="onSearch(item.tagName)"
        disable-transitions
      >{{item.tagName}}</el-tag>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import colorFormat from "../../lib/js/tagColorFormat.js";
export default {
  name: "",
  props: ["searched"],
  data() {
    return {
      tags: [],
      normal: true
    };
  },
  components: {},
  methods: {
    onSearch(tags) {
      console.log(tags);

      console.log("tagListUpdate111111111111111111111111");
      this.$nextTick(() => {
        this.$emit("UpdateSearchParams", { tags });
        this.$emit("UpdateSearch", true);
      });
    },
    tagColor(str) {
      // console.log("tabgColor", str);
      return colorFormat(str, 1, 1, 1);
    },
    onMore() {
      this.normal = false;
      let height = this.$refs.content.scrollHeight;
      this.$refs.content.style.setProperty("--max-height", height + "px");
    },
    onGetTags() {
      this.axios.get("/tags/query").then(res => {
        // console.log(res);
        if (res.status == 200) {
          console.log("getTags");
          // this.$refs.content.classList.remove("onMore");

          this.tags = res.data.data;
          // this.$nextTick(() => {
          //   let height = this.$refs.content.scrollHeight;
          //   this.$refs.content.style.setProperty("--max-height", height + "px");
          // });
        }
      });
    }
  },
  watch: {},
  created() {
    // console.log("getting tags");
    this.onGetTags();
  }
};
</script>

<style lang="scss" scoped>
.tagList {
  overflow: hidden;
  background-color: white;
  border-radius: 3px;
  transition: all 1s ease;
  .list-title {
    padding: 1em 1em 1em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightseagreen;
    .right {
      color: lightskyblue;
      cursor: pointer;
    }
  }
  .onMore {
    max-height: var(--max-height) !important;
  }
  .content {
    padding: 1em;
    transition: max-height 1s ease;
    max-height: 35px;
    overflow: hidden;
    .el-tag {
      margin: 0.6em 0.4em 0.6em 0.4em;
      color: white;
      cursor: pointer;
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
  }
}
.tagListDisable {
  // 禁止
  opacity: 0.5;
  pointer-events: none;
}
</style>
