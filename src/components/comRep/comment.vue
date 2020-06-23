<template>
  <div class="comment-container">
    <hr class="comment-divider" />
    <div class="comment">
      <div class="avatar">
        <!-- <el-avatar :fit="fill" :src=""></el-avatar> -->
        <img
          width="100%"
          height="100%"
          :src="comment.user.avatar?avatarURL(comment.user.avatar):null"
        />
      </div>
      <div class="comment-main">
        <div class="head">
          <div class="head-left">
            <span>{{comment.user.userName}}</span>
            <span
              class="head-user-role"
              :class="comment.user.role>0?'head-user-manager':null"
            >{{comment.user.role | roleFormat}}</span>
          </div>
          <div class="head-right">
            <!-- <span>{{commentIndex}}楼,</span> -->
            <span>{{comment.createTime|dateFormat}} ago</span>
          </div>
        </div>
        <div class="content">
          <p>{{comment.content}}</p>
          <div class="comment-opt">
            <a @click="onReply">回复</a>
            <el-popconfirm
              v-if="comment.user._id==$store.getters.UserId"
              confirmButtonText="好的"
              cancelButtonText="算了"
              icon="el-icon-info"
              iconColor="red"
              title="确定删除吗？"
              @onConfirm="onDelete"
            >
              <a slot="reference">删除</a>
            </el-popconfirm>
          </div>
        </div>

        <div class="replies">
          <reply
            v-for="(reply,i) in comment.replies"
            :key="i"
            :reply="reply"
            :replyIndex="i"
            :_id="comment._id"
          ></reply>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import reply from "./reply.vue";
import moment from "moment";
import setPicUrl from "../../lib/js/setPicUrl";
import roles from "../../lib/js/roles";
export default {
  name: "",
  inject: ["loadComment"],
  props: ["comment", "commentIndex", "boardId"],
  data() {
    return {};
  },
  components: { reply },
  methods: {
    avatarURL(url) {
      return setPicUrl(url);
    },
    onDelete() {
      console.log(this.boardId);
      if (typeof this.boardId == "number") {
        console.log("deleteMs");
        this.deleteMsBoardComment();
      } else {
        console.log("deleteArt");
        this.deleteArtComment();
      }
    },
    deleteMsBoardComment() {
      let boardId = this.boardId;
      let commentId = this.comment._id;
      this.axios
        .post("/messageBoard/removeComments", { commentId, boardId })
        .then(res => {
          if (res.status == 200) {
            this.$message("删除成功");
            this.loadComment();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteArtComment() {
      let commentId = this.comment._id;
      this.axios
        .post("/comRep/removeComment", { commentId })
        .then(res => {
          if (res.status == 200) {
            this.$message("删除成功");
            this.loadComment();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onReply() {
      this.$prompt("请输入回复内容")
        .then(({ value }) => {
          console.log(value);
          let commentId = this.comment._id;
          let content = value;
          let to = this.comment.user._id;
          this.axios
            .post("/comRep/addReply", { commentId, content, to })
            .then(res => {
              console.log(res);
              if (res.status == 200) {
                this.$message("回复成功");
                this.loadComment();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    }
  },
  filters: {
    dateFormat(val) {
      return moment(val).toNow(true);
    },
    roleFormat(val) {
      return roles(val);
    }
  },
  created() {
    // console.log("COMMENTINCOMPONENT", this.comment);
    // console.log("BOARDID", this.boardId);
  }
};
</script>

<style lang="scss" scoped>
.comment-container {
  .comment-divider {
    border: 1px solid linear-gradient();
  }
  .comment {
    display: flex;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
    }
    .comment-main {
      width: 100%;
      .head {
        display: flex;
        justify-content: space-between;

        .head-left {
          .head-user-role {
            margin-left: 3em;
            color: cornflowerblue;
            font-size: 0.3em;
          }
          .head-user-manager {
            color: red;
          }
        }
      }
      .content {
        display: flex;
        justify-content: space-between;

        p {
          width: 70%;
          word-break: break-all;
        }
        .comment-opt {
          display: flex;
          align-self: flex-end;
          a {
            margin-left: 0.8em;
            color: darkcyan;
            cursor: pointer;
          }
        }
      }

      .replies {
        width: 80%;

        background-color: LightCyan;

        border-radius: 5px;
      }
    }
  }
}
</style>
