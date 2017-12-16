import React, { Component } from 'react';
import instance from '../utils/axios'
import UserNew from '../component/user-new'
import {Redirect} from 'react-router-dom'
import './App.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.focusTextInput = this.focusTextInput.bind(this);    
    this.state={
      isLogin:false
    }
  }
  componentDidMount(){
  }
  componentWillMount(){}
  focusTextInput() {
    let inputAccessToken = this.textInput.value;
    let self = this;
    instance.post('/api/v1/accesstoken',{accesstoken:inputAccessToken}).then(function(res){
      console.log(res)
      if(res.data.success){
        localStorage.userAccesstoken= inputAccessToken;
        self.setState({
          isLogin:true
        })
      }
    })
  }
  render() {
    if(this.state.isLogin) {
      return (
       <Redirect to="/"/>
      )
    }
    return (
        <div className="main">
          <div className="main-left">
            <div className="main-title">
              <p>主页 / <span>登录</span></p>
            </div>
            <div className="login-box">
              <input ref={(input) => { this.textInput = input; }} defaultValue="" className="login-key" type="text" placeholder="Access Token" /> 
              <div onClick={this.focusTextInput} className="login-but">
                <span>登录</span>
              </div>
            </div>
          </div>
          {/* <UserNew userData={{avatar_url:'',loginname:''}} /> */}
        </div>
    );
  }
}

export default Login;
