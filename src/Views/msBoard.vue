<template>
  <div class="msboard-container">
    <el-row>
      <el-col :xs="1" :sm="3">&nbsp;</el-col>

      <el-col :xs="22" :sm="18">
        <not-login v-if="!   $store.getters.isLogin"></not-login>
        <div class="msboard" v-if="$store.getters.isLogin">
          <leave-message @loadComment="loadComment"></leave-message>
          <div class="msboard-comments">
            <comment
              v-for="(comment,i) in comments"
              :key="i"
              :comment="comment"
              :commentIndex="i"
              :boardId="0"
            ></comment>
            <div class="msboard-navigation">
              <el-pagination
                class="big"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="everyNum"
                :current-page.sync="page"
              ></el-pagination>

              <el-button class="small" @click="page=page-1" v-show="page>1">上一页</el-button>
              <el-button class="small" @click="page=page+1" v-show="page<total/everyNum">下一页</el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="1" :sm="3">&nbsp;</el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import notLogin from "../components/login/notLogin.vue";
import leaveMessage from "../components/msBoard/leaveMessage.vue";
import comment from "../components/comRep/comment.vue";
export default {
  name: "",
  provide() {
    return {
      loadComment: this.loadComment
    };
  },
  data() {
    return {
      comments: [],
      total: 100,
      page: 1,
      everyNum: 10
    };
  },
  watch: {
    page: {
      immediate: true,
      handler(newVal) {
        this.loadComment();
        this.updateTotal();
      }
    }
  },
  components: { comment, leaveMessage, notLogin },
  methods: {
    updateTotal() {
      let params = { boardId: 0 };
      this.axios
        .get("/messageBoard/queryCountById", { params })
        .then(res => {
          console.log(res.data);
          if ((res.status = 200)) {
            this.total = res.data.data.count;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadComment() {
      console.log("loading");
      let boardId = 0;
      let page = this.page;
      let everyNum = this.everyNum;
      let params = { boardId, page, everyNum };
      this.axios
        .get("/messageBoard/queryById", { params })
        .then(res => {
          if (res.status == 200) {
            this.comments = res.data.data.comments;
            console.log(this.comments);
            this.updateTotal();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //  this.loadComment();
  }
};
</script>

<style lang="scss" scoped>
.msboard-container {
  min-height: 100%;

  .msboard {
    padding: 1em;
    background-color: white;
    .msboard-input {
      height: 20px;
    }

    .msboard-comments {
      .msboard-navigation {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .small {
          display: none;
        }

        @media screen and(max-width:768px) {
          .small {
            display: block;
          }
          .big {
            display: none;
          }
        }
      }
    }
  }
}
</style>
