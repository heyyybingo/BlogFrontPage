<template>
  <div class="articleInfo" v-loading="loading">
    <div class="list-title">
      <div class="title-left">
        <i></i>
        文章列表
      </div>
      <div class="title-right">
        共
        <span>{{total}}</span>
        篇
      </div>
    </div>
    <div class="content" ref="content">
      <el-card v-for="(item,index) in articles" :key="index" @click.native="ToDetail(item._id)">
        <div slot="header" class="title">
          <span class="title">
            <i class="iconfont icon-biaoti"></i>
            {{item.title}}
          </span>
          <span class="time">
            <i class="iconfont icon-gantan"></i>
            {{item.lastUpdateTime | dateFormat}}
          </span>
        </div>

        <div class="info">
          <div class="artInfo">
            <pre class="markdown-body">{{item.simpleContent}}</pre>
          </div>

          <div class="baseInfo">
            <div>
              <el-tag v-for="(tag,i) in item.tags" :key="i" :color="tagColor(tag)">{{tag}}</el-tag>
            </div>

            <!-- <p>
              <i class="iconfont icon-zuozhe"></i>:who?
            </p>-->
            <p>
              <i class="iconfont icon-dianzan"></i>
              :{{item.favs}}
            </p>
            <p>
              <i class="iconfont icon-liulan-copy"></i>
              :{{item.enters}}
            </p>
          </div>
        </div>
      </el-card>
    </div>

    <div class="block">
      <el-pagination
        class="big"
        @size-change="handleSizeChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>

      <el-button class="small" @click="currentPage=currentPage-1" v-show="currentPage>1">上一页</el-button>
      <el-button
        class="small"
        @click="currentPage=currentPage+1"
        v-show="currentPage<total/pageSize"
      >下一页</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mavonEditor } from "mavon-editor";
import moment from "moment";
import colorFormat from "../../lib/js/tagColorFormat.js";
export default {
  name: "",
  props: ["searched", "searchParams"],
  data() {
    return {
      loading: true,
      articles: [],
      total: 0,
      pageSizes: [5, 10, 15, 20],
      pageSize: 5,
      currentPage: 0,
      artInfo:
        "DASDASDADASDASDSADASDSADSADASDNS\nsadsadasdasdsadad\nsadasdadadadas\nasdadasdasadasdassadasdasdasdasdasdasdadDASDASDASDADASDASDSADASDSADSADASDNS\nsadsadasdasdsadad\nsadasdadadadas\nasdadasdasadasdassadasdasdasdasdasdasdadDASDASDADASDASDSADASDSADSADASDNS\nsadsadasdasdsadad\nsadasdadadadas\nasdadasdasadasdassadasdasdasdasdasdasdadDASDASDASDADASDASDSADASD"
    };
  },
  components: {},
  created() {
    this.axios.get("/article/queryCount").then(res => {
      console.log(res);
      if (res.status == 200) {
        // this.$emit("UpdateTotal", res.data.data);
        this.total = res.data.data;
        this.loading = false;
      }
    });
  },
  methods: {
    tagColor(str) {
      return colorFormat(str, 1, 1, 1);
    },
    md(value) {
      return mavonEditor.getMarkdownIt().render(value);
    },
    handleSizeChange(size) {
      console.log(size);
      let page = this.currentPage;
      let everyNum = size;
      let params = { page, everyNum };
      if (this.searched) {
        params = Object.assign(params, this.searchParams);
      }
      this.loading = true;
      this.axios.get("/article/queryList", { params }).then(res => {
        console.log(1);
        console.log(res);
        if ((res.status = 200)) {
          this.articles = res.data.data;
          console.log(res.data.data);

          this.loading = false;
        }
      });
    },
    ToDetail(id) {
      console.log("go");
      this.$router.push({
        path: "/Detail",
        query: {
          _id: id
        }
      });
    }
  },
  watch: {
    currentPage(current) {
      console.log(current);
      if (current <= 0) {
        return;
      }
      let page = current;
      let everyNum = this.pageSize;
      let params = { page, everyNum };
      if (this.searched) {
        params = Object.assign(params, this.searchParams);
      }
      console.log(params);
      this.loading = true;
      this.axios.get("/article/queryList", { params }).then(res => {
        console.log(1);
        console.log(res);
        if ((res.status = 200)) {
          this.articles = res.data.data;
          console.log(res.data.data);
          this.loading = false;
        }
      });
    },
    searched(val) {
      this.currentPage = -1;
      let params = null;
      if (val) {
        params = this.searchParams;
      }

      this.axios.get("/article/queryCount", { params }).then(res => {
        console.log(res);
        if (res.status == 200) {
          // this.$emit("UpdateTotal", res.data.data);
          this.total = res.data.data;
          this.loading = false;
        }
      });
      this.$nextTick(() => {
        this.currentPage = 1;
      });
    }
  },
  filters: {
    dateFormat(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="scss" scoped>
.articleInfo {
  background-color: white;
  .list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 1em 0em 1em;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    border-bottom: 1px solid lightskyblue;
    background-color: white;
    .title-right {
      span {
        color: darkcyan;
        font-size: 1.5em;
      }
    }
  }
  .content {
    // transition: all 1s ease;
    .el-card {
      cursor: pointer;
      &:hover {
        transform: scale(1.01, 1.01);
      }
      .title {
        font-size: 0.9em;
        .time {
          float: right;
        }
      }
      .info {
        .artInfo {
          // border-bottom: 1px dashed darkmagenta;
          padding: 1em 1em 1em 1em;
          border-radius: 5px;
          // background-color: ;

          .markdown-body {
            height: 7em;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4; //要显示的行数
            line-height: 1.2em;

            word-wrap: break-word;
            word-break: normal;
          }
        }
        .baseInfo {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 0.5em;
          padding-top: 1em;
          .el-tag {
            color: white;
          }
          p {
            padding-left: 2em;
            width: 10em;
            overflow: hidden;
            .icon-dianzan {
              color: lightsalmon;
            }
          }
        }
      }
    }
  }

  .block {
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
</style>
