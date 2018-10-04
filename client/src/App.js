import React, { Component } from 'react';
import './App.css';
import NewColorButton from './NewColorButton.js';

class App extends Component {
  state = {
    color: '',
    rgb: '',
    hsl: '',
    textColor: 'black'
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        color : res,
        rgb : res.rgb,
        hsl : res.hsl
      }))
      .then(
        this.determineTextColor(this.state.rgb.red, this.state.rgb.green, this.state.rgb.blue)
          .then(res => this.setState({
            textColor : res
          })))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/color/random');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  determineTextColor = async (red, green, blue) => {
    var nThreshold = 105;
    var bgDelta = (red * 0.299) + (green * 0.587) + (blue * 0.114);
    console.log(bgDelta);
    return (255 - bgDelta < nThreshold) ? 'black' : 'white';
  }

  getNewColor = () => {
    this.callApi()
      .then(res => this.setState({
        color : res,
        rgb : res.rgb,
        hsl : res.hsl
      }))
      .then(
        this.determineTextColor(this.state.rgb.red, this.state.rgb.green, this.state.rgb.blue)
          .then(res => this.setState({
            textColor : res
          })))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="App" style={{backgroundColor : this.state.color.hex, color : this.state.textColor}}>
          <span>
            <div className="NameOfColor"> {this.state.color.name} </div>
            {this.state.color.hex} <br/>
            RGB: {this.state.rgb.red}, {this.state.rgb.green}, {this.state.rgb.blue} <br/>
            HSL: {this.state.hsl.hue}, {this.state.hsl.saturation}, {this.state.hsl.lightness}
          </span>
          <NewColorButton
            colorHex={this.state.color.hex}
            textColor={this.state.textColor} />
        </div>
      </div>
    );
  }
}

export default App;
