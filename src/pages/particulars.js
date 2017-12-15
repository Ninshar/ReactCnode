import React, { Component } from 'react';
import axios from 'axios'
import HeaderNav from '../component/header-nav'
import './particulars.css';

class App extends Component {
  constructor(){
    super()
    this.state={
      datas:{
        author:{
          avatar_url:''
        }
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
  tabs(tab, top ,good){
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
  // tabs(top, good){
  //   if(top){
  //     return '置顶'
  //   }else if(good){
  //     return '精华'
  //   }
  // }
  render() {
    let {datas} = this.state;
    
    return (
      <div className="App">
        <HeaderNav />
        <div className="particulars">
          <div className="particulars-left">
            <div className="particulars-con">
              <div className="particulars-con-header">
                <p>{datas.top|| datas.good?<span>{this.tabs(null,datas.top, datas.good)}</span>:""} {datas.title}</p>
                <div className="particulars-con-information">
                  <div className="particulars-con-text">
                    <span> 发布于 {datas.create_at} 天前 </span> 
                    <span> 作者 {datas.author.loginname} </span>  
                    <span> {datas.visit_count} 次浏览 </span>
                    <span> 最后一次编辑是 {datas.last_reply_at} 天前 </span>
                    <span> 来自 {this.tabs(datas.tab)} </span>
                  </div>
                  <div className="particulars-collect-but">收藏</div>
                </div>
              </div>
              <div>
                {/* {datas.content} */}
              </div>
            </div>
          </div>
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
          {/* <code>
           {data.content}
          </code> */}
        </div>
      </div>
    );
  }
}

export default App;
