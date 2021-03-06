import axios from "axios"
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
})

http.interceptors.request.use(function(config){
    if(localStorage.token){
        config.headers.Authorization = "Bearer " + (localStorage.token || "");
    }
    return config;
},err=>{
    return Promise.reject(err)

})

// 响应拦截，通用错误处理

http.interceptors.response.use(res => {
    return res
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type: "error",
            message: err.response.data.message
        })
        
    }
    console.log("status",err.response.status);
    if(err.response.status === 401){
        router.push('/login');
    }
    return Promise.reject(err)
})
export default http