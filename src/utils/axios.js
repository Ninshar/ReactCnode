import axios from 'axios'
/*
*
* 网络初始化请求配置
*
*/
const instance = axios.create({
  baseURL: 'https://cnodejs.org',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const Getdata = (url,parame) => {//'/api/v1/topics'
  return new Promise(function(resolve, reject) {
    instance.get(url,{params:parame}).then(function (response) {
        if (response){
          resolve(response);
        }
    }).catch(function (error) {
      console.log(error);
    });
  });
}


export default instance;