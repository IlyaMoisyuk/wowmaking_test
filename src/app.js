import React from 'react';
import Canvas from './components/Canvas';
import Menu from './components/Menu';
import './css/app.scss'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      action: null
    }
  }


  render() {
    return(
        <div className="app">
            <Canvas even={this.state.action}></Canvas>
            <Menu act={this.actionClick}></Menu>
        </div>
    );
  }

  actionClick = (data) => {
    this.setState({action: data});
  }
}
