import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    color: '',
    rgb: '',
    hsl: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({
        color : res,
        rgb : res.rgb,
        hsl : res.hsl
      }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/color/random');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  getNewColor = () => {
    this.callApi()
      .then(res => this.setState({
        color : res,
        rgb : res.rgb,
        hsl : res.hsl
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="App" style={{backgroundColor : this.state.color.hex}}>
          <span>
            <div className="NameOfColor"> {this.state.color.name} </div>
            {this.state.color.hex} <br/>
            RGB: {this.state.rgb.red}, {this.state.rgb.green}, {this.state.rgb.blue} <br/>
            HSL: {this.state.hsl.hue}, {this.state.hsl.saturation}, {this.state.hsl.lightness}
          </span>
          <button onClick={this.getNewColor} style= {{backgroundColor : this.state.color.hex}}>Get New Color</button>
        </div>
      </div>
    );
  }
}

export default App;
