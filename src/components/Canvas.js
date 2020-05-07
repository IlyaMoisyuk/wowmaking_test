import React from 'react';
import { GithubPicker  } from 'react-color';

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


  componentDidMount(){
    this.ctx = this.canvas.current.getContext('2d');
    this.events = {
      pen: mousePaint(this.ctx, this.state.colorMouse, this.state.weight),
      clear: mouseClear(this.ctx),
      allClear: clearCanvas(this.ctx)
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.even !== this.state.event) {
      this.setState({event: this.props.even})
      this.updateCanvas(this.state.event);
    }

    if(prevState.weight == this.state.weight || prevState.colorMouse == this.state.colorMouse){
      this.events = {
        pen: mousePaint(this.ctx, this.state.colorMouse, this.state.weight),
        clear: mouseClear(this.ctx),
        allClear: clearCanvas(this.ctx)
      }
      this.updateCanvas(this.state.event);

    }

  }

  updateCanvas = (data) => {

    let color = this.state.colorMouse;
    let weight = this.state.weight;



    if(this.props.even == 'allClear'){
      this.events.allClear();
      return;
    }

    let mouseDown
    this.canvas.current.addEventListener('mousedown', mouseDown = (e) => {

      if(this.state.colorMouse == color && this.state.weight == weight){
        this.canvas.current.addEventListener('mousemove', this.events[this.state.event]);
        this.canvas.current.addEventListener('mouseup', () => {
          this.canvas.current.removeEventListener('mousemove', this.events[this.state.event]);
        })  
      }else{
        this.canvas.current.removeEventListener('mousedown', mouseDown);
        
      }

    })
  }
  





  canvasCss = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight,
    boxSizing: 'border-box',
    position: 'relative'
  }



  render() {
    return(
      <>
        <canvas style={this.canvasCss} width={this.canvasCss.width} height={this.canvasCss.height} ref={this.canvas}></canvas>
        {this.state.event == 'pen' ?
          <div className="hideMenu">
            <GithubPicker onChangeComplete={(color) => this.changeColor(color) }/> 
            <div class="weightReact">
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
    this.setState({weight: width});
  }


  changeColor = (color) => {
    this.setState({colorMouse: color.hex});
  }


}


let mousePaint = (context, color, weight) => (e) => {
  context.fillStyle = color;
  context.fillRect(e.offsetX, e.offsetY, weight, weight)  

}

let mouseClear = (context) => (e) => {
  context.clearRect(e.offsetX, e.offsetY, 20, 20)  

}

let clearCanvas = (context) => (e) => {
  context.clearRect(0, 0, window.innerWidth * 0.9, window.innerHeight);
}