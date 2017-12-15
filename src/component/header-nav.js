import React from 'react';
import {
  Link
} from 'react-router-dom'

const headerNav = () =>{
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
          <li><Link to="/">新手入门</Link></li>
          <li><Link to="/">API</Link></li>
          <li><Link to="/">关于</Link></li>
          <li><Link to="/">注册</Link></li>
          <li><Link to="/">登录</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default headerNav;