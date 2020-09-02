const mongoose = require('mongoose')

//schema定义一个模型的字段有哪些
const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}
})

// 导出一个模型
module.exports = mongoose.model("Category",schema)