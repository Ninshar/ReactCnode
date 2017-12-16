import React, { Component } from 'react';
import axios from 'axios'
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
    // alert(1)
    this.ajaxParticulars(id);
  }
  componentWillMount(){
  //   alert(2)
  }
  ajaxParticulars(id,parame){
     let self = this;
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`,{params:parame})
    .then(function (response) {
      // self.state.listData=[];
      self.setState({
        datas: response.data.data
      })
      console.log(self.state.datas);
    })
    .catch(function (error) {
      console.log(error);
    });
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
                  <div className="particulars-collect-but">收藏</div>
                </div>
              </div>
              <div className="particulars-vessel" dangerouslySetInnerHTML={{__html:datas.content}}></div>
              <ReviewItem items={datas} />
            </div>
          </div>
          <UserNew tabState={1} userData={datas.author} />
        </div>
    );
  }
}

export default Particulars;
