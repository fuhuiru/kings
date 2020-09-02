<template>
  <div class="about">
    <h1>{{id?`编辑广告位`:`新建广告位`}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-button size="small" @click="model.items.push({})">
            <i class="el-icon-plus"></i> 添加广告位
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.items" :key="index">
              <el-form-item label="跳转链接">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="广告图片" >
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image',res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
        name: "",
        items:[]
      },
    };
  },
  created() {
    this.id && this.fetch();
  },

  watch: {
    //   监听路由变化，当进入分类编辑页面的时候，输入框有对应填好的分类名称，这时候如果点击新建分类，就要是输入框里面的分类名称消失（这里用watch监听路由变化）
    $route: {
      handler(val, oldVal) {
        if (val.fullPath === "/ads/create") {
          this.model.name = this.model.parent = "";
          //在这里做你要做的事
        }
        console.log(oldVal);
      },
      deep: true, //深度监听
    },
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
     
    },
    async save() {
      // this.$http()
      // console.log(123);
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/ads/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/ads", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/ads/list");
      this.$message({
        type: true,
        message: "保存成功",
      });
      console.log(res);
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}

</style>