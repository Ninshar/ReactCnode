import React, { Component } from 'react';
import instance from '../utils/axios'

import ReviewItem from '../component/review-item'
import UserNew from '../component/user-new'
import './particulars.css';
import { formatPassTime, backTabText } from '../utils/Utils'

class Particulars extends Component {
  constructor(){
    super()
    this.state={
      datas:{
        author:{
          avatar_url:''
        },
        replies:[]
      }
    }
  }
  componentDidMount(){
    let id = this.props.match.params.id;
    this.ajaxParticulars(id);
  }
  componentWillMount(){
  }
  async ajaxParticulars(id){
    // 获取用户信息
    let user = await instance.post('/api/v1/accesstoken',{accesstoken:localStorage.userAccesstoken});
    // 获取用户收藏列表
    let backdata = await instance.get(`/api/v1/topic_collect/${user.data.loginname}`);
    // 获取当期页面数据
    let {data} = await instance.get(`/api/v1/topic/${id}`)
    //判断当前用户是否点赞过评论
    this.isUps(data.data.replies,user.data);
    // 判断是否收藏，返回数据   
    this.isCollect(backdata,data);
    //赋值当前页面数据  
    this.setState({
      datas:data.data
    })
  }
  isCollect(backdata,data){
    for(let i=0;i<backdata.data.data.length; i++){
      if(backdata.data.data[i].id===data.data.id){
        data.data.is_collect = true;
      }
    }
  }
  isUps(repliesData,userData){
    for(let i=0;i<repliesData.length;i++){
      if(repliesData[i].ups.indexOf(userData.id) > -1){
        repliesData[i].is_uped = true;
      }
    }
  }
  // 收藏按钮
  async collectBut(id,isCollect){
    let AjaxReturnData={};
    let pageData = this.state.datas;
    if(isCollect){
      AjaxReturnData = await instance.post(`/api/v1/topic_collect/de_collect`,{accesstoken:localStorage.userAccesstoken,topic_id:id});
    }else{
      AjaxReturnData = await instance.post(`/api/v1/topic_collect/collect`,{accesstoken:localStorage.userAccesstoken,topic_id:id});
    }
    if(AjaxReturnData.data.success){
      pageData.is_collect = !pageData.is_collect;
      this.setState({
        datas:pageData
      })
    }
  }
  async onClickUps(reply_id){
    let user = await instance.post(`/api/v1/reply/${reply_id}/ups`,{accesstoken:localStorage.userAccesstoken});
    let pageDatas = this.state.datas;
    if(user.data.success&&user.data.action==="up"){
      this.forUps(user.data.action,pageDatas,reply_id)
    }else if(user.data.success&&user.data.action==="down"){
      this.forUps(user.data.action,pageDatas,reply_id)
    }
  }
  forUps(action,pageDatas,reply_id){
    let self = this;
    for(let i=0; i<pageDatas.replies.length; i++){
      if(pageDatas.replies[i].id===reply_id){
        action==='up'?pageDatas.replies[i].ups.length++:pageDatas.replies[i].ups.length--
        pageDatas.replies[i].is_uped=!pageDatas.replies[i].is_uped
        self.setState({
          datas:pageDatas
        })
      }
    }
  }
  render() {
    let {datas} = this.state;
    
    return (
        <div className="main">
          <div className="main-left">
            <div className="particulars-con">
              <div className="particulars-con-header">
                <p>{datas.top|| datas.good?<span>{backTabText(null,datas.top, datas.good)}</span>:""} {datas.title}</p>
                <div className="particulars-con-information">
                  <div className="particulars-con-text">
                    <span> 发布于 {formatPassTime(datas.create_at)} </span> 
                    <span> 作者 {datas.author.loginname} </span>  
                    <span> {datas.visit_count} 次浏览 </span>
                    <span> 最后一次编辑是 {formatPassTime(datas.last_reply_at)} </span>
                    <span> 来自 {backTabText(datas.tab)} </span>
                  </div>
                  <div onClick={this.collectBut.bind(this,datas.id,datas.is_collect)} style={{backgroundColor:datas.is_collect?'#e5e5e5':'#80bd01',color:datas.is_collect?'#333':'#fff'}} className="particulars-collect-but">{datas.is_collect?'取消收藏':'收藏'}</div>
                </div>
              </div>
              <div className="particulars-vessel" dangerouslySetInnerHTML={{__html:datas.content}}></div>
              <div className="review-item">
                <p className="main-title">{datas.reply_count} 回复</p>
                {
                  datas.replies.map((item,index)=>
                    <ReviewItem key={item.id} onClickUps={this.onClickUps.bind(this,item.id)} loginname={datas.author.loginname} index={index} item={item} />
                  )
                }
              </div>
            </div>
          </div>
          <UserNew tabState={1} userData={datas.author} />
        </div>
    );
  }
}

export default Particulars;
