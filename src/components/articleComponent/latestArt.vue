<template>
  <div class="latest">
    <div class="list-title">
      <div class="left">最近文章</div>
    </div>

    <div class="content">
      <div v-if="articles.length<=0" style="text-align:center;">暂无数据</div>
      <div
        class="artInfo"
        v-for="(item,index) in articles"
        :key="index"
        @click="ToDetail(item._id)"
      >
        <span class="title">{{item.title}}</span>

        <div class="time">
          <i class="iconfont icon-shijian"></i>
          <span>{{item.lastUpdateTime | dateFormat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      articles: []
    };
  },
  components: {},
  methods: {
    ToDetail(_id) {
      this.$router.push({
        path: "/Detail",
        query: {
          _id
        }
      });
    }
  },
  filters: {
    dateFormat(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    let page = 1;
    let everyNum = 3;
    let params = { page, everyNum };
    this.axios
      .get("/article/queryList", { params })
      .then(res => {
        console.log("latest res", res);
        if (res.status == 200) {
          this.articles = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.latest {
  background-color: white;

  border-radius: 3px;
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

  .content {
    .artInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1em 1em 1em 1em;
      border-bottom: 1px dashed darkgray;
      cursor: pointer;
      &:hover {
        color: lightcoral;
      }

      .title {
        font-size: 0.8em;
      }

      .time {
        padding-left: 1em;
        font-size: 0.5em;
        white-space: nowrap;
      }
    }
  }
}
</style>
