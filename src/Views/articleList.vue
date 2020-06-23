<template>
  <div class="article-container">
    <el-row>
      <el-col :xs="1" :sm="3">
        <span>.</span>
      </el-col>
      <el-col class="left" :xs="22" :sm="11">
        <article-info :searched="searched" :searchParams="searchParams"></article-info>
      </el-col>

      <el-col class="right" :xs="0" :sm="6">
        <search
          @UpdateSearch="UpdateSearch"
          @UpdateSearchParams="UpdateSearchParams"
          :searched="searched"
        ></search>
        <tagList
          @UpdateSearch="UpdateSearch"
          @UpdateSearchParams="UpdateSearchParams"
          :searched="searched"
        ></tagList>
        <latest-art></latest-art>
      </el-col>

      <el-col :xs="1" :sm="3">
        <span>.</span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import articleInfo from "../components/articleComponent/articleInfo.vue";
import search from "../components/articleComponent/search.vue";
import tagList from "../components/articleComponent/tagList.vue";
import latestArt from "../components/articleComponent/latestArt.vue";

export default {
  name: "",

  data() {
    return {
      searched: false,
      searchParams: {}
    };
  },
  components: { articleInfo, search, tagList, latestArt },
  methods: {
    UpdateSearch(search) {
      this.searched = search;
      console.log("ArticleList", this.searched);
    },
    UpdateSearchParams(searchParams) {
      this.searchParams = searchParams;
      console.log("ArticleList", this.searchParams);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-container {
  .el-row {
    .right {
      margin-left: 1em;
      & > * {
        margin-bottom: 1.5em;
      }
    }
  }
}
</style>
