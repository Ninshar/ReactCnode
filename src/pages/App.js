import React, { Component } from 'react';
import instance from '../utils/axios'
import HeaderNav from '../component/header-nav'
import HomeList from '../component/home-list'
import './App.css';
import { Link } from 'react-router-dom';
import { parseQueryString } from '../utils/Utils'

class App extends Component {
  constructor(){
    super()
    this.state={
      tabli:[
        {title:'全部',tabLab:'all'},
        {title:'精华',tabLab:'good'},
        {title:'分享',tabLab:'share'},
        {title:'问答',tabLab:'ask'},
        {title:'招聘',tabLab:'job'},
        {title:'客户端测试',tabLab:'all'}],
      listData:[],
      selectTabIndex:0,
    }
  }
  componentDidMount(){
    this.ajaxHomeList(parseQueryString(this.props.location.search));

    this.setState({
      selectTabIndex:this.getUrlIndex()
    })
  }
  componentWillMount(){}
  getUrlIndex(){//获取当前tab类型，返回索引
    let urlobj = parseQueryString(this.props.location.search);
    let thisIndex=0;
    for(let i=0; i<this.state.tabli.length; i++){
      if(this.state.tabli[i].tabLab === urlobj.tab){
       thisIndex=i;
      }
    }
    return thisIndex;
  }
  ajaxHomeList(parame){
    let self = this;
    instance.get('/api/v1/topics',{params:parame})
    .then(function (response) {
      self.state.listData=[];
      self.setState({
        listData:response.data.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // 切换首页TAB文章类型
  onSelectTab({item,index}){
    this.ajaxHomeList({tab:item.tabLab})
    this.setState({
      selectTabIndex:index
    })
    console.log(item)
  }
  render() {
    let {tabli, selectTabIndex, listData} = this.state;
    return (
      <div className="App">
        <HeaderNav />
        <div className="home-box">
          <ul className="home-box-tab">
            {
              tabli.map((item,index)=> 
                <li onClick={this.onSelectTab.bind(this,{item,index})} className={index===selectTabIndex?'cur':''} key={index}>
                  <Link to={{search: `?tab=${item.tabLab}`}} >{item.title}</Link>
                </li>)
            }
          </ul>
          <HomeList Listdata={listData} />
        </div>
      </div>
    );
  }
}

export default App;
