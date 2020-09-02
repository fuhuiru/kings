<template>
  <div class="about">
    <h1>{{id?`编辑物品`:`新建物品`}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        
      },
      value: "",
      parents: [],
    };
  },
  created() {
    // console.log(this.$route.path);
    this.id && this.fetch();
    this.fetchParents();
  },

  watch: {
    //   监听路由变化，当进入分类编辑页面的时候，输入框有对应填好的分类名称，这时候如果点击新建分类，就要是输入框里面的分类名称消失（这里用watch监听路由变化）
    $route: {
      handler(val, oldVal) {
        if (val.fullPath === "/items/create") {
          this.model.name = this.model.parent = "";
          //在这里做你要做的事
        }
        console.log(oldVal);
      },
      deep: true, //深度监听
    },
  },
  methods: {
    afterUpload(res){
      this.$set(this.model,'icon',res.url);
      // this.model.icon = res.url;
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const parentsCates = await this.$http.get(`rest/items`);
      console.log(parentsCates.data);
      this.parents = parentsCates.data;
    },
    async save() {
      // this.$http()
      // console.log(123);
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/items", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/items/list");
      this.$message({
        type: true,
        message: "保存成功",
      });
    },
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>