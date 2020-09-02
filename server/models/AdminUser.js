const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    username:{type:String},
    password: {
        type: String,
        select:false,
        // set在这里的作用就是把password这个值改一下再保存
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
        // npm i bcrypt模块做密码的散列，
    }
})

module.exports =  mongoose.model('AdminUser',schema)