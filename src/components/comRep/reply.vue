<template>
  <div class="reply-container">
    <hr class="reply-divider" />
    <div class="reply-info">
      <!-- 左半边，（xx）回复(xx) -->
      <div class="reply-headInfo">
        <div class="reply-userInfo">
          <div class="avatar">
            <!-- <el-avatar :fit="fill" :src=""></el-avatar> -->
            <img
              width="100%"
              height="100%"
              :src="reply.from.avatar?avatarURL(reply.from.avatar):avatar"
            />
          </div>
          <span class="reply-user">@{{reply.from.userName}}</span>
          <span>回复</span>
          <div class="avatar">
            <!-- <el-avatar :fit="fill" :src=""></el-avatar> -->
            <img
              width="100%"
              height="100%"
              :src="reply.to.avatar?avatarURL(reply.to.avatar):avatar"
            />
          </div>
          <span class="reply-user">@{{reply.to.userName}}</span>
          <span>:</span>
        </div>
        <div>
          <!-- <span>{{replyIndex}}楼,</span> -->
          <span>{{reply.createTime|dateFormat}} ago</span>
        </div>
      </div>
      <p>{{reply.content}}</p>
    </div>
    <div class="reply-opt">
      <a @click="onReply">回复</a>
      <el-popconfirm
        v-if="reply.from._id==$store.getters.UserId"
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
</template>

<script type="text/ecmascript-6">
import moment from "moment";
import setPicUrl from "../../lib/js/setPicUrl";
export default {
  name: "",
  inject: ["loadComment"],
  props: ["reply", "replyIndex", "_id"],
  data() {
    return {
      avatar: "/src/lib/image/avatar.jpg"
    };
  },
  components: {},
  methods: {
    avatarURL(url) {
      return setPicUrl(url);
    },
    onDelete() {
      let commentId = this._id;
      let replyId = this.reply._id;
      this.axios
        .post("/comRep/removeReply", { replyId, commentId })
        .then(res => {
          console.log(res);
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
          let commentId = this._id;
          let to = this.reply.from._id;
          let content = value;
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
        .catch(err => {
          console.log("cancel");
        });
    }
  },
  filters: {
    dateFormat(val) {
      return moment(val).toNow(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.reply-container {
  max-width: 90%;
  font-size: 0.75em;
  .reply-divider {
    border: 1px dashed #8470ff;
    opacity: 0.2;
  }
  .reply-info {
    .reply-headInfo {
      display: flex;
      justify-content: space-between;
      .reply-userInfo {
        display: flex;
        align-items: center;
        .reply-user {
          color: darkslateblue;
        }
        .avatar {
          width: 18px;
          height: 18px;
        }
        @media screen and(max-width:768px) {
          .avatar {
            display: none;
          }
        }
      }
    }
    p {
      word-break: break-all;
    }
  }

  .reply-opt {
    a {
      margin-right: 0.8em;
      color: darkcyan;
      cursor: pointer;
    }
  }
}
</style>
