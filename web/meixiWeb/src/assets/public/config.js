import axios from 'axios';
import Toast from 'vant/lib/toast';
import router from '../../router';
import 'vant/lib/toast/style';
export default{
    langcang_config:{
        /**
         * 默认URL
         */
        url : "/api/",
        /**
         * 
         * API
         */
        api:{
            /**
             * 首页专区
             * **/
            owenrUser:"owenrUser",//登录
            numPage:"numPage",//业主信息分页
            vipDetail:"vipDetail",//会员权益
            business:"business",//合作商家
        }
    },
}
/***
 * 
 *请求拦截，请求后台前设置token到请求头
 * 
 */
   axios.interceptors.request.use(config => {
  let token = localStorage.getItem("nameId");
  if(token)
  {
    config.headers['token'] = token
  }
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // {对响应错误做点什么
    if(error.response.status == 401){
        Toast("请重新登录")
        router.replace('/');
    }
    return Promise.reject(error);
  });