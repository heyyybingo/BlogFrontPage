<template>
  <div class="myheader">
    <el-row type="flex" align="center">
      <el-col :xs="24" :sm="4">
        <LogoContent></LogoContent>
      </el-col>

      <!-- 右侧导航链接 -->
      <el-col :xs="0" :sm="20" class="tabbar">
        <tabLinkList></tabLinkList>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import LogoContent from "../LogoContent/LogoContent.vue";
import tabLinkList from "../TabLinkList/tabLinkList.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: { tabLinkList, LogoContent },
  methods: {}
};
</script>

<style lang="scss" scoped>
.myheader {
  background: linear-gradient(black, rgb(51, 57, 61));

  height: 100%;
  .el-row {
    height: 100%;
    padding: 0.5em 0 0.5em 0;
    .tabbar {
      transition: all 1s ease;
    }
  }
}
</style>
