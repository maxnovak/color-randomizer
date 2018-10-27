import React, { Component } from 'react';
import './App.css';
import NewColorButton from './NewColorButton.js';
import AddColor from './AddColor.js'
import Modal from './Modal.js'

class App extends Component {
  state = {
    color: '',
    rgb: '',
    hsl: '',
    textColor: 'black',
    visible: false
  };

  componentDidMount() {
    this.getNewColor();
  }

  callApi = async () => {
    const response = await fetch('/api/color/random');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  determineTextColor = (red, green, blue) => {
    var nThreshold = 105;
    var bgDelta = (red * 0.299) + (green * 0.587) + (blue * 0.114);
    return (255 - bgDelta < nThreshold) ? 'black' : 'white';
  }

  getNewColor = () => {
    this.callApi()
      .then(res =>
        this.setState({
        textColor : this.determineTextColor(res.rgb.red, res.rgb.green, res.rgb.blue),
        color : res,
        rgb : res.rgb,
        hsl : res.hsl
      }))
      .catch(err => console.log(err));
  }

  showForm = () => {
    this.setState({visible: true});
  }

  closeModal = () => {
    this.setState({
        visible : false
    });
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
          <Modal
            visible={this.state.visible}
            onClickAway={() => this.closeModal()}
          />
          <AddColor
            showForm={this.showForm}
            colorHex={this.state.color.hex}
            textColor={this.state.textColor}
            />
          <NewColorButton
            getNewColor={this.getNewColor}
            colorHex={this.state.color.hex}
            textColor={this.state.textColor} />
        </div>
      </div>
    );
  }
}

export default App;
