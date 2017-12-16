import React from 'react';
// import PropTypes from 'prop-types';

import { formatPassTime } from '../utils/Utils'

const Reviewitem = ({items}) =>{
  return(
    <div className="review-item">
     <p className="title">{items.reply_count} 回复</p>
     {
      items.replies.map((item,index)=>{
         return(
          <div key={item.id} className="review-list">
            <img className="header-img" src={item.author.avatar_url} alt="" />
            <div className="review-box">
              <div className="review-box-top"> 
                <div className="review-box-information">
                  <span>{item.author.loginname}</span>
                  <a>{`${index+1}楼 .${formatPassTime(item.create_at)}`}</a>
                  {items.author.loginname===item.author.loginname?<p className="author">作者</p>:''}
                </div>
                <div className="review-box-fun">
                {/* 这里暂停 */}
                  <span className="like"></span>
                </div>
              </div>
              <div className="review-box-con" dangerouslySetInnerHTML={{__html:item.content}}></div>
            </div>
          </div>
         )
      })
     }
    </div>
  );
}
// Reviewitem.PropTypes = {
//   items: PropTypes.shape({
//     replies:PropTypes.array,
//   })
// }

export default Reviewitem;