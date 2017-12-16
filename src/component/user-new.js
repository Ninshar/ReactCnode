import React from 'react';
import logo from '../logo.svg'
import {
  Link
} from 'react-router-dom'
import { formatPassTime, backTabText} from '../utils/Utils'

const headerNav = ({Listdata}) =>{
  return(
    <div className="particulars-right">
        <p className="title">作者</p>
        <div className="author">
            <div className="author-information">
            <img src={datas.author.avatar_url} alt="" />
            <span>{datas.author.loginname}</span>
            </div>
            {/* <span>积分: 3360 </span>
            <p>“ 追求卓越，成功就会在不经意间追上你。” </p> */}
        </div>
    </div>
  );
}

export default headerNav;