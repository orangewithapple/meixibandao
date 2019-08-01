import axios from 'axios'
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
            users:"users",//登录
            numPage:"numPage"
        }
    },
    //  axios.create({
    //     baseURL:'http://easy-mock.com/mock/596077559adc231f357bcdfb/axios/',
    //     timeout: 1000,
    //     responseType:'json',
    //     headers:{
    //       'custome-header': 'miaov',
    //       'content-type':'application/x-www-form-urlencoded'   //转换为key=value的格式必须增加content-type
    //     },
    //     transformRequest:[function(data){
    //         console.log(data)
    //       data.age = 30;  //发送之前增加的属性
    //       return queryString.stringify(data);    //利用对应方法转换格式
    //     }]
    //   })
}
//    axios.interceptors.request.use(config => {
//   let getInfo =JSON.parse(localStorage.getItem("userInfo"));
//   let token = getInfo.Token;
//   if(token)
//   {
//       console.log(1)
//       config.headers.Authorization = token;
//   }
//   return config
// }, error => {
//   // 请求错误处理
//   return Promise.reject(error)
// })
// // http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//          console.log(2)
//       }
//       return Promise.reject(error.response.data) 
//   });

// var HTTP = axios.create({
//     baseURL:'/api/',
//     timeout: 1000,
//     responseType:'json',
//     headers:{
//       'custome-header': 'miaov',
//       'content-type':'application/x-www-form-urlencoded'   //转换为key=value的格式必须增加content-type
//     },
//     transformRequest:[function(data){
//         console.log(data)
//       data.age = 30;  //发送之前增加的属性
//       return queryString.stringify(data);    //利用对应方法转换格式
//     }]
//   })
