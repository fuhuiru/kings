<template>
  <el-table :data="items" border style="width: 100%">
    <el-table-column fixed prop="_id" label="id"></el-table-column>
    <el-table-column prop="name" label="英雄名称"></el-table-column>
    <el-table-column prop="title" label="称号"></el-table-column>
    <el-table-column prop="icon" label="头像">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" alt="" style="height:3rem;">
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button
          @click="$router.push(`/heroes/edit/${scope.row._id}`)"
          type="text"
          size="small"
        >编辑</el-button>
        <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
      console.log(res);
    },
    async remove(row) {
      this.$confirm(`此操作将永久删除该文件${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/heroes/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script> 