import React from 'react';
// import PropTypes from 'prop-types';

import { formatPassTime } from '../utils/Utils'

const Reviewitem = ({item,loginname,index,onClickUps}) =>{
  return(
    <div key={item.id} className="review-list">
      <img className="header-img" src={item.author.avatar_url} alt="" />
      <div className="review-box">
        <div className="review-box-top"> 
          <div className="review-box-information">
            <span>{item.author.loginname}</span>
            <a>{`${index+1}楼 .${formatPassTime(item.create_at)}`}</a>
            {loginname===item.author.loginname?<p className="author">作者</p>:''}
          </div>
          <div className="review-box-fun">
            <span onClick={onClickUps} style={{backgroundColor:item.is_uped?'#f40':'#80bd01'}} className="like">点赞 {item.ups.length}</span>                  
          </div>
        </div>
        <div className="review-box-con" dangerouslySetInnerHTML={{__html:item.content}}></div>
      </div>
    </div>
  );
}
// Reviewitem.PropTypes = {
//   items: PropTypes.shape({
//     replies:PropTypes.array,
//   })
// }

export default Reviewitem;