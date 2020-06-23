<template>
  <div class="artDetail">
    <el-row>
      <el-col :xs="1" :sm="2" :md="2" :lg="2" :xl="2">
        <span>。</span>
      </el-col>
      <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" class="main" v-loading="loading">
        <div class="title">
          <h3>{{article.title}}</h3>
          <span>
            <i class="iconfont icon-shijian"></i>
            {{article.lastUpdateTime |dateFormat}}
          </span>

          <div class="baseInfo">
            <p>
              <i class="iconfont icon-zuozhe"></i>
              : {{article.author.userName}}
            </p>
            <p @click="notliked &&AddFavs(article._id)" class="favBlock">
              <i class="iconfont icon-dianzan" :class="{'icon-dianzan-clicked':!notliked}"></i>
              : {{article.favs}}
            </p>
            <p>
              <i class="iconfont icon-liulan-copy"></i>
              : {{article.enters}}
            </p>
          </div>
        </div>

        <div class="content">
          <markdown :content="article.content"></markdown>
        </div>

        <div class="share">
          分享文章：
          <div>
            <i class="iconfont icon-qq"></i>
          </div>
          <div>
            <i class="iconfont icon-weixin"></i>
          </div>
          <div>
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>
        <not-login v-if="!$store.getters.isLogin"></not-login>
        <div class="art-comments" v-if="$store.getters.isLogin">
          <leave-message :articleId="article._id"></leave-message>
          <comment v-for="(comment,i) in comments" :key="i" :comment="comment" :commentIndex="i"></comment>
        </div>
      </el-col>
      <el-col :xs="1" :sm="2" :md="2" :lg="2" :xl="2">
        <span>。</span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
// import marked from "marked";
import leaveMessage from "../components/msBoard/leaveMessage.vue";
import comment from "../components/comRep/comment.vue";
import markdown from "../components/artDetail/markdown.vue";
import { mavonEditor } from "mavon-editor";
import moment from "moment";
import notLogin from "../components/login/notLogin.vue";
export default {
  name: "",
  provide() {
    return {
      loadComment: this.loadComment
    };
  },
  data() {
    return {
      loading: true,
      content: "111",
      article: {
        author: {}
      },
      comments: [],
      notliked: true
    };
  },
  components: { markdown, comment, leaveMessage, notLogin },
  methods: {
    AddFavs(_id) {
      this.notliked = false;

      let params = { _id };
      this.axios
        .get("/article/addFavs", { params })
        .then(res => {
          if (res.status == 200) {
            this.article.favs = this.article.favs + 1;
          }
        })
        .catch(err => {
          this.notliked = true;
        });
    },
    loadComment() {
      console.log("ARTICLECOMMENTS LOADING");
      let article = this.article._id;
      let params = { article };
      this.axios
        .get("/comRep/articleComments", { params })
        .then(res => {
          if (res.status == 200) {
            this.comments = res.data.data;
            console.log(this.comments);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    dateFormat(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    let _id = this.$route.query._id;
    let params = { _id };
    this.axios
      .get("/article/query", { params })
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          this.article = res.data.data;

          let md = mavonEditor.getMarkdownIt();
          this.article.content = md.render(this.article.content);

          let authorId = this.article.authorId;
          let params = { _id };
          // return this.axios.get("/manager/getAuthor", { params });
          return this.axios.get("/article/addEnters", { params });
        } else {
          throw 1;
        }
      })
      .then(res => {
        if (res.status == 200) {
          console.log("ok");
          this.loading = false;
          this.loadComment();
        } else {
          throw 1;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.artDetail {
  .main {
    .title {
      color: white;
      text-align: center;
      font-size: 1.5em;
      & > * {
        padding: 1em 1em 1em 1em;
      }
      .baseInfo {
        display: flex;
        justify-content: center;

        p {
          padding: 1em 1em 1em 1em;
          font-size: 1.2em;

          .icon-dianzan-clicked {
            color: red;
          }
        }
        .favBlock {
          cursor: pointer;
          &:hover {
            animation: changeColor 3s forwards;
          }
          @keyframes changeColor {
            0% {
              color: orange;
            }
            33% {
              color: yellow;
            }
            66% {
              color: green;
            }
            100% {
              color: blue;
            }
          }
        }
      }
    }

    .share {
      display: flex;
      justify-content: center;
      color: white;
      align-items: center;
      padding: 2em 0 2em 0;
      div {
        border: 1px solid white;
        border-radius: 50%;
        margin-left: 1em;
        padding: 0.5em 0.5em 0.5em 0.5em;
        i {
          font-size: 2em;
        }
      }
    }

    .art-comments {
      padding: 2em;
      background-color: white;
    }
  }
}
</style>
