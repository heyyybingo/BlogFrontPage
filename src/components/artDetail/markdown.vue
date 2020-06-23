<template>
  <div class="content">
    <!-- <div v-highlight v-html=""></div> -->
    <div v-highlight v-html="content" class="markdown-body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import "github-markdown-css";
export default {
  props: ["content"],
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.content {
  background-color: white;
  padding: 2em 2em 2em 2em;
}
</style>
