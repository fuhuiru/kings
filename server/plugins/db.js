module.exports = app => {
    // module.export = app =>{导出的是一个函数，接受一个参数app

    const mongoose = require('mongoose');

    mongoose.connect("mongodb://localhost:27017/node-vue-moba", { useNewUrlParser: true,useUnifiedTopology: true  })

}