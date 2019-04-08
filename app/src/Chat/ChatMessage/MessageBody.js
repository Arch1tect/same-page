import './MessageBody.css'

import React, { Component } from 'react'
import {  Radio } from 'antd'


class App extends Component {
  render() {
    return (
      <div className='sp-message-body'>
        {this.props.text}    
      </div>
    );
  }
}

export default App;
