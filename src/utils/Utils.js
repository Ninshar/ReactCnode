/*
*
* {日期转换时间}
*
*/
export const formatPassTime = (startTime) =>{
  let currentTime = Date.parse(new Date())
  let time = currentTime - Date.parse(startTime)
  let day = parseInt(time / (1000 * 60 * 60 * 24),0);
  let hour = parseInt(time / (1000 * 60 * 60),0)
  let min = parseInt(time / (1000 * 60),0)
  let month = parseInt(day / 30,0)
  let year = parseInt(month / 12,0)
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}

/*
*
* {日期转换时间}
*
*/
export const parseQueryString = (url)=> {
  url = url == null ? window.location.href : url
  var search = url.substring(url.lastIndexOf('?') + 1)
  if (!search) {
      return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/*
*
* {返回标签类型}
*
*/
export const backTabText = (tab='', top=false ,good=false) => {
  if(top){
    return '置顶'
  }else if(good){
    return '精华'
  }
  switch(tab){
    case'share':
      return '分享'
    case 'ask':
      return '问答'
    case 'job':
      return '招聘'
    case 'dev':
      return '测试'
    default:
      // break;
      // console.log('类型未定义：'+tab)
      break;
  }
}
/*
*
*判断是否有accessToken
*
*/
export function isUser(){
  if(localStorage.userAccesstoken){
    return true;
  }else{
    return false;
  }
}