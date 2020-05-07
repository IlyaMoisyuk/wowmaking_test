import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser, faSnowplow, faSave, faDownload } from '@fortawesome/free-solid-svg-icons'



export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.menu = React.createRef();
  }


  render() {
    return(
        <div className="menu">
            <span className="paint">Paint</span>
            <ul className="menuItem" ref={this.menu}>
              <li onClick={(e) => {this.stateGo('pen', e.currentTarget)}}>
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </li>
              <li onClick={(e) => this.stateGo('clear', e.currentTarget)}> 
                <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
              </li>
              <li onClick={(e) => this.stateGo('allClear', e.currentTarget)}>
                <FontAwesomeIcon icon={faSnowplow}></FontAwesomeIcon>
              </li>
            </ul>
            <div className="logo">
                <img src="./img/logo.png"/>
                <img src="./img/logo-text.png"/>
            </div>
        </div>
    );
  }

  stateGo = (data, elem) => {
    console.log(this.menu.current.querySelectorAll('li'))
    this.menu.current.querySelectorAll('li').forEach(el => {
      if(el == elem){
        el.classList.add('activeMenu')
      }else{
        el.classList.remove('activeMenu')
      }
    })
    this.props.act(data)
  }
}

