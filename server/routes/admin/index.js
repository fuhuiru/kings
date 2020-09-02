module.exports = app=>{
    const express = require("express")
    const router = express.Router({
        mergeParams:true,
    })
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    
    // 创建数据接口
    router.post("", async function(req,res){
        const model = await req.Model.create(req.body);
        res.send(model);
    })
    // 查找数据接口
    router.get("",  async function(req,res){
        console.log(req.Model.modelName);
        const queryOptions = {}
        if(req.Model.modelName == 'Category'){
            queryOptions.populate = 'parent'
        }
        const data = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(data)  
    })
    // 修改接口
    router.put("/:id", async function(req,res){
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body);
        res.send(model);
    })
    // 删除接口
    router.delete("/:id", async function(req,res){
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    // 查找单条数据
    router.get("/:id",async function(req,res){
        const findData = await req.Model.findById(req.params.id);
        res.send(findData)
    })

    // 登录校验中间件
    const authMiddleWare = require('../../middleware/auth');
    const resourceMiddleWare = require('../../middleware/resource');
    
    // express中间件
    app.use("/admin/api/rest/:resource", authMiddleWare(),resourceMiddleWare(),router);
    /**
     * app.use("/admin/api",router)
     * router路由对象里面的路由都会匹配到"/admin/api/rest/:resource"后面
     */
    const multer = require('multer');
    const upload = multer({dest:__dirname+ '/../../uploads'})
    // 图片上传接口
     app.post("/admin/api/upload", authMiddleWare(),async (req, res,next)=>{
        const modelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${modelName}`);
        next()
    }, upload.single('file'),async(req,res)=>{
         const file = req.file;
         file.url = `http://localhost:3000/uploads/${file.filename}`
         res.send(file);
     })

     app.post("/admin/api/login", async(req,res)=>{
         const {username,password} = req.body;
        //  根据用户名找用户
        console.log(username,password);
        const user = await AdminUser.findOne({username}).select('+password');
        console.log(user);
        assert(user,422,'用户不存在')
        // if(!user){
        //     return res.status(422).send({
        //         message:"用户不存在"
        //     })
        // }
        // 验证用户密码是否正确
        const isValid = require("bcrypt").compareSync(password,user.password)
        assert(isValid,422,'密码错误')

        // if(!isValid){
        //     res.status(422).send({
        //         message:"密码错误"
        //     })
        // }
        // 返回token npm i jsonWebToken(做web的token验证的)
        
        const token = jwt.sign({id:user._id},app.get('secret')) 
        res.send(token)
        



     })
    //  错误处理函数
     app.use(async (err,req,res,next) =>{
        //  console.log(err.statusCode);
        res.status(err.statusCode || 500).send({
            message:err.message
        })
     })

   
} 