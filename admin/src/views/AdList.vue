<template>
  <div class="about">
     <el-table
      :data="adsList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="广告位名称">
      </el-table-column>

      <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
        <el-button  type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>    
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      adsList:[],
    };
  },
  created() {
    // console.log(this.$route.path);
    this.fetch();
  },
 
  watch: {
    //   监听路由变化，当进入分类编辑页面的时候，输入框有对应填好的分类名称，这时候如果点击新建分类，就要是输入框里面的分类名称消失（这里用watch监听路由变化）
    $route:{
      handler(val, oldVal){
         if(val.fullPath === '/ads/create'){
             this.model.name = this.model.parent = '';
            //在这里做你要做的事
         }
         console.log(oldVal);
      },
      deep:true //深度监听
   }

  },
  methods: {
    async remove(id){
      const res = await this.$http.delete(`rest/ads/${id}`);
      if(res.data.success){
        this.$message({
          type:'success',
          message:'删除成功'
        })
      }
      this.fetch();
      console.log(res);
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads`);
      this.adsList = res.data;
      console.log(this.adsList);
    },
    
  },
};
</script>