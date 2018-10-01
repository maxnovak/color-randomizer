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

  render() {
    return (
      <div className="App" style={{backgroundColor : this.state.color.hex}}>
        {this.state.color.name} <br/>
        {this.state.color.hex} <br/>
        RGB: {this.state.rgb.red}, {this.state.rgb.green}, {this.state.rgb.blue} <br/>
        HSL: {this.state.hsl.hue}, {this.state.hsl.saturation}, {this.state.hsl.lightness}
      </div>
    );
  }
}

export default App;
