import React from 'react';
import { isUser } from '../utils/Utils'

import { Link } from 'react-router-dom';

const userNew = ({tabState, userData}) =>{

  return(
    <div className="particulars-right">
        {isUser()||tabState===1?<p className="main-title">{tabState===1?'作者':'个人信息'}</p>:''}
        {isUser()||tabState===1?<div className="author">
            <div className="author-information">
              <img src={userData.avatar_url} alt="" />
              <span>{userData.loginname}</span>
            </div>
            {/* <span>积分: 3360 </span>
            <p>“ 追求卓越，成功就会在不经意间追上你。” </p> */}
        </div>:<div className="introduce-box">
          <p className="introduce-title">CNode：Node.js专业中文社区</p>
          <Link className="login-buttom" to="/login">登录</Link>
        </div>}
    </div>
  );
}

export default userNew;