<template>
  <div class="userInfo-container">
    <el-row>
      <el-col :xs="1" :sm="2" :md="2" :lg="2" :xl="2">
        <span>&nbsp;</span>
      </el-col>
      <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" class="main">
        <div class="userInfo">
          <div class="avatar">
            <img :src="imageUrl" height="100%" width="100%" />
          </div>
          <el-form ref="updateUser" :model="user" :rules="rules" label-width="80px">
            <form style="margin:0 0 20px 80px;" ref="uploadAvatar">
              <input type="file" name="image" @change="changeImage" :disabled="!editable" />
            </form>
            <el-form-item label="用户名">
              <el-input v-model="user.userName" :disabled="true||!editable"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password" :disabled="!editable"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email" :disabled="true||!editable"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="editable=true" v-show="!editable">编辑</el-button>
              <el-button @click="editable=false" v-show="editable">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :xs="1" :sm="2" :md="2" :lg="2" :xl="2">
        <span>&nbsp;</span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import setPicUrl from "../lib/js/setPicUrl";
import myavatar from "../lib/image/avatar.jpg";
export default {
  name: "",
  data() {
    return {
      user: {},

      progress: null,
      imageUrl: myavatar,
      editable: false,
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blue" },
          { min: 3, max: 18, message: "长度在3-18之间", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    loadUserInfo() {
      this.editable = false;
      console.log("userINfo");
      this.axios
        .post("/user/userInfo")
        .then(res => {
          if (res.status == 200) {
            this.user = res.data.data;
            console.log("getUserInfo", this.user);
            if (this.user.avatar !== null) {
              this.imageUrl = setPicUrl(this.user.avatar);
            }

            console.log(this.user);
            console.log("imageURL", this.imageUrl);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      this.$refs["updateUser"].validate(valid => {
        if (valid) {
          if (this.imageUrl != this.user.avatar || this.imageUrl != imageUrl) {
            this.UploadAndSub();
          } else {
            this.InstantSub();
          }
        } else {
          this.$message.error("检查输入");
        }
      });
    },

    // this.axios.post("/upload/uploadImage", param, config).then(res => {
    //   console.log(res);
    //   this.imageUrl = setPicUrl(res.data.data);
    // });

    UploadAndSub() {
      var form = this.$refs["uploadAvatar"];
      var param = new FormData(form);
      var config = {
        "Content-type": "multipart/form-data"
      };
      console.log(param);
      this.axios
        .post("/upload/uploadImage", param, config)
        .then(res => {
          if ((res.status = 200)) {
            this.imageUrl = res.data.data;
            let _id = this.user._id;
            let avatar = this.imageUrl;
            let password = this.user.password;
            let oldavatar = this.user.avatar;
            return this.axios.post("/user/updateUser", {
              avatar,
              password,
              _id,
              oldavatar
            });
          }
        })
        .then(res => {
          console.log(res);
          let token = res.data.data;
          // console.log("REFRESH BEFORE", this.$store.state.token);
          this.$store.dispatch("refreshToken", { token });
          // console.log("REFRESH AFTER ", this.$store.state.token);
          this.loadUserInfo();
          this.$message("修改成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    InstantSub() {
      let _id = this.user._id;
      let password = this.user.password;
      this.axios
        .post("/user/updateUser", { password, _id })
        .then(res => {
          console.log(res);
          let token = res.data.data;
          //   console.log("REFRESH BEFORE", this.$store.state.token);
          this.$store.dispatch("refreshToken", { token });
          //  console.log("REFRESH AFTER ", this.$store.state.token);
          this.loadUserInfo();
          this.$message("修改成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeImage(e) {
      console.log(e);
      var file = e.target.files[0];
      if (file.type != "image/jpeg") {
        this.$message.error("图片需要是jpeg格式");
        return;
      }
      var maxSize = 1024 * 1024 * 2;
      if (file.size > maxSize) {
        this.$message.error("图片小于2m");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = e => {
        this.imageUrl = e.target.result;
        console.log(this.imageUrl);
      };
    }
  },
  created() {
    this.loadUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.userInfo-container {
  .userInfo {
    background-color: white;
    display: flex;
    border-radius: 3px;
    padding: 2em;

    .avatar {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 178px;
      height: 178px;
    }
  }
  @media screen and(max-width:768px) {
    .userInfo {
      display: block;
      .avatar {
        margin: 0 auto;
      }
    }
  }
}
</style>
