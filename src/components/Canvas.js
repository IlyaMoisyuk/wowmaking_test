import React from 'react';
import { GithubPicker } from 'react-color';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      event: null,
      colorMouse: '#000000',
      weight: 3
    }
  }

  ctx;
  events


  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d');
    this.events = {
      pen: this.mousePaint(),
      clear: this.mouseClear(),
      allClear: this.mouseAllClear()
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.even !== this.state.event) {
      this.setState({ event: this.props.even })
      this.updateCanvas(this.state.event);
    }

    if (prevState.weight == this.state.weight || prevState.colorMouse == this.state.colorMouse) {
      this.updateCanvas(this.state.event);

    }

  }

  updateCanvas = (data) => {
    for (let key in this.events) {
      if (key == this.state.event && this.state.event !== 'allClear') {
        this.canvas.current.addEventListener('mousemove', this.events[this.state.event]);
      } else if (this.state.event == 'allClear') {
        this.events[this.state.event]()
      } else {
        this.canvas.current.removeEventListener('mousemove', this.events[key]);
      }
    }
  }






  canvasCss = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight,
    boxSizing: 'border-box',
    position: 'relative'
  }



  render() {
    return (
      <>
        <canvas style={this.canvasCss} width={this.canvasCss.width} height={this.canvasCss.height} ref={this.canvas}></canvas>
        {this.state.event == 'pen' ?
          <div className="hideMenu">
            <GithubPicker onChangeComplete={(color) => this.changeColor(color)} />
            <div className="weightReact">
              <span onClick={() => this.changeWeight(3)}></span>
              <span onClick={() => this.changeWeight(10)}></span>
              <span onClick={() => this.changeWeight(20)}></span>
            </div>
          </div>
          : ""}
      </>
    );
  }

  changeWeight = (width) => {
    this.ctx.lineWidth = width;
  }


  changeColor = (color) => {
    this.ctx.strokeStyle = color.hex;
  }

  mousePaint = () => (e) => {
    var x = e.offsetX;
    var y = e.offsetY;
    var dx = e.movementX;
    var dy = e.movementY;

    if (e.buttons > 0) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x - dx, y - dy);
      this.ctx.stroke();
      this.ctx.closePath();
    }

  }

  mouseClear = () => (e) => {
    if (e.buttons > 0) {
      this.ctx.clearRect(e.offsetX, e.offsetY, 20, 20);
    }
  }

  mouseAllClear = () => (e) => {
    console.log(this.canvas.offsetWidth)
    this.ctx.clearRect(0, 0, this.canvas.current.offsetWidth, this.canvas.current.offsetHeight);

  }


}



