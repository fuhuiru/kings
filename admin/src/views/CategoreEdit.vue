<template>
  <div class="about">
    <h1>{{id?`编辑分类`:`新建分类`}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        name: "",
        parent: "",
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
    $route:{
      handler(val, oldVal){
         if(val.fullPath === '/categories/create'){
             this.model.name = this.model.parent = '';
            //在这里做你要做的事
         }
         console.log(oldVal);
      },
      deep:true //深度监听
   }

  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const parentsCates = await this.$http.get(`rest/categories`);
      console.log(parentsCates.data);
      this.parents = parentsCates.data;
    },
    async save() {
      // this.$http()
      // console.log(123);
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/categories", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/categories/list");
      this.$message({
        type: true,
        message: "保存成功",
      });
    },
  },
};
</script>