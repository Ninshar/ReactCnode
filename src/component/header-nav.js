import React from 'react';
import {
  Link
} from 'react-router-dom'
import { isUser } from '../utils/Utils'

const headerNav = () =>{

  function isOutLogin(){
    
    if(isUser()){
      localStorage.userAccesstoken= '';
    }
  }
  return(
    <div className="App-header">
      <div className="App-header-box">
        <div className="header-left">
          <Link to="/">
            <img src="http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" className="App-logo" alt="logo" />
          </Link>
          <input className="search" type="text" />
        </div>
        <ul className="header-right">
          <li><Link to="/">首页</Link></li>
          {isUser()?<li><Link to="/">未读消息</Link></li>:''}
          <li><Link to="/">新手入门</Link></li>
          <li><Link to="/">API</Link></li>
          <li><Link to="/">关于</Link></li>
          <li><Link to="/">{isUser()?'设置':'注册'}</Link></li>
          <li onClick={isOutLogin}><Link to={isUser()?'':'/login'}>{isUser()?'退出':'登录'}</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default headerNav;