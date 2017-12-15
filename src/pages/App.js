import React, { Component } from 'react';
// import logo from './logo.svg';
import axios from 'axios'
import HeaderNav from '../component/header-nav'
import HomeList from '../component/home-list'
import './App.css';
import { Link } from 'react-router-dom';

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
    this.ajaxHomeList(this.parseQueryString(this.props.location.search));
    // console.log(this.parseQueryString(this.props.location.search))
    this.setState({
      selectTabIndex:this.getUrlIndex()
    })
    
  }
  componentWillMount(){
  }
  getUrlIndex(){//暂停
    let urlobj = this.parseQueryString(this.props.location.search);
    let thisIndex=0;
    for(let i=0; i<this.state.tabli.length; i++){
      if(this.state.tabli[i].tabLab === urlobj.tab){
       thisIndex=i;
      }
    }
    return thisIndex;
  }
  parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }
  ajaxHomeList(parame){
    let self = this;
    axios.get('https://cnodejs.org/api/v1/topics',{params:parame})
    .then(function (response) {
      self.state.listData=[];
      self.setState({
        listData:response.data.data
      })
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  onSelectTab({item,index}){
    switch(item.title){
      case '全部':
        this.ajaxHomeList();
        break;
      case '精华':
        this.ajaxHomeList({tab:'good'})
        break;
      case '分享':
        this.ajaxHomeList({tab:'share'})    
      break;
      case '问答':
        this.ajaxHomeList({tab:'ask'}) 
        break;
      case '招聘':
        this.ajaxHomeList({tab:'job'}) 
        break;
      case '客户端测试':
        this.ajaxHomeList() 
        break;
      default:
        console.log(item);
    }
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
