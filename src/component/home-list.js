import React from 'react';
import logo from '../logo.svg'
import {
  Link
} from 'react-router-dom'

const headerNav = ({Listdata}) =>{
  function tabs(tab, top ,good){
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
      default:
        console.log('类型未定义：'+tab)
    }
  }
  function formatPassTime(startTime) {
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
  return(
    <div className="home-list">
      {
        Listdata.map((item) => {
          return(
            <div key={item.id} className="home-list-li">
              <div className="home-list-left">
                <img src={item.author.avatar_url} alt="" />
                <p><span>{item.reply_count}/</span>{item.visit_count}</p>
                <div className="home-list-cen">
                  <span className={item.top||item.good?'cur':''}>{tabs(item.tab, item.top, item.good)}</span>
                  <Link to={`/topic/${item.id}`}>{item.title}</Link>
                </div>
              </div>
              <div className="home-list-right">
                <img src={logo} alt="" />
                <span>{formatPassTime(item.last_reply_at)}</span>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default headerNav;