<template>
  <div class="about">
    <h1>{{id?`编辑分类`:`新建分类`}}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
        username: "",
        password:''
      },
      value: "",
      parents: [],
    };
  },
  created() {
    this.id && this.fetch();
  },
 
  watch: {
    //   监听路由变化，当进入分类编辑页面的时候，输入框有对应填好的分类名称，这时候如果点击新建分类，就要是输入框里面的分类名称消失（这里用watch监听路由变化）
    $route:{
      handler(val, oldVal){
         if(val.fullPath === '/admin_users/create'){
             this.model.username = this.model.password = '';
            //在这里做你要做的事
         }
         console.log(oldVal);
      },
      deep:true //深度监听
   }

  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
    
    async save() {
      // this.$http()
      console.log(123);
      let res; // eslint-disable-line no-unused-vars
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model); // eslint-disable-line no-unused-vars
      } else {
        res = await this.$http.post("rest/admin_users", this.model); // eslint-disable-line no-unused-vars
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: true,
        message: "保存成功",
      });
    },
  },
};
</script>