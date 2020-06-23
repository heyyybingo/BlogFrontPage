<template>
  <div class="leavMessage-container">
    <!-- <h3>留言区</h3> -->
    <div class="leaveMessage-inp">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="content"
        maxlength="100"
        :rows="8"
        show-word-limit
      ></el-input>
    </div>
    <div class="leaveMessage-opt">
      <a class="leaveMessage-btn" @click="onSubmit">Submit</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  props: ["articleId"],
  inject: ["loadComment"],
  data() {
    return {
      content: ""
    };
  },
  components: {},
  methods: {
    onSubmit() {
      if (this.articleId !== undefined && this.articleId !== null) {
        this.articleSubmit();
      } else {
        this.msSubmit();
      }
    },
    articleSubmit() {
      console.log("LeaveMessage");
      let article = this.articleId;
      let content = this.content;
      if (content.length < 5) {
        this.$message.error("请至少输入5个字符！");
        return;
      }
      this.axios
        .post("/comRep/addComment", { article, content })
        .then(res => {
          if (res.status == 200) {
            this.$message("提交成功！");
            this.loadComment();
            this.clear();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    msSubmit() {
      console.log("LeaveMessage");
      let boardId = 0;
      let content = this.content;
      if (content.length < 5) {
        this.$message.error("请至少输入5个字符！");
        return;
      }
      this.axios
        .post("/messageBoard/addComments", { boardId, content })
        .then(res => {
          if (res.status == 200) {
            this.$message("提交成功！");
            this.loadComment();
            this.clear();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      this.content = "";
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 1em;
}
.leavMessage-container {
  position: relative;
  .leaveMessage-inp,
  .leaveMessage-opt {
    margin: 0 2em 0 2em;
  }
  .leaveMessage-opt {
    display: flex;
    justify-content: flex-end;
    $btn-width: 125px;
    $btn-height: 40px;
    $btn-color: #8470ff;
    $btn-color-dark: darken($btn-color, 45%);
    $btn-height-small: $btn-height/2;
    $btn-width-small: $btn-width/2;
    .leaveMessage-btn {
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
        transform: translateX(-100%);
        transition: 0.3s all ease;
      }
      &:hover {
        color: white;
        &::before {
          transform: translateX(0);
        }
      }
    }
    @media screen and(max-width:768px) {
      .leaveMessage-btn {
        height: $btn-height-small;
        width: $btn-width-small;
        line-height: $btn-height-small;
        // pointer-events: none;
        &::before {
          content: none;
        }
        &:hover {
          color: inherit;
        }
      }
    }
  }
}
</style>
