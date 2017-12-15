import React from 'react';
import logo from '../logo.svg'
import {
  Link
} from 'react-router-dom'
import { formatPassTime, backTabText} from '../utils/Utils'

const headerNav = ({Listdata}) =>{
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
                  <span className={item.top||item.good?'cur':''}>{backTabText(item.tab, item.top, item.good)}</span>
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