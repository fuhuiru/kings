<template>
  <div class="about">
    <h1>{{id?`编辑文章`:`新建文章`}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {
        title: "",
        categories: [],
      },
      categories: [],
    };
  },
  created() {
    // console.log(this.$route.path);
    this.id && this.fetch();
    this.fetchCategories();
  },

  watch: {
    //   监听路由变化，当进入分类编辑页面的时候，输入框有对应填好的分类名称，这时候如果点击新建分类，就要是输入框里面的分类名称消失（这里用watch监听路由变化）
    $route: {
      handler(val, oldVal) {
        if (val.fullPath === "/articles/create") {
          this.model.name = this.model.parent = "";
          //在这里做你要做的事
        }
        console.log(oldVal);
      },
      deep: true, //深度监听
    },
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);

      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const parentsCates = await this.$http.get(`rest/categories`);
      console.log(parentsCates.data);
      this.categories = parentsCates.data;
      console.log(this.model.categories);
    },
    async save() {
      // this.$http()
      // console.log(123);
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/articles", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/articles/list");
      this.$message({
        type: true,
        message: "保存成功",
      });
    },
  },
};
</script>