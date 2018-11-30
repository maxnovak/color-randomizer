import React, { Component } from 'react';
import style from './style.js';

class Modal extends Component {
	constructor(props) {
		super(props);
    this.state = {
      style: style,
      name: '',
      hex: '',
      red: '',
      green: '',
      blue: '',
      hue: '',
      saturation: '',
      lightness: '',
      textColor: 'black'
    }
	}

  componentWillReceiveProps({visible}) {
    this.setState({
        visible : visible
    });
  }

  componentDidMount() {
    let panel = { ...this.state.style.panel }
    panel.backgroundColor = '#fff'
    this.setState(prevousState => ({
      style: {
        ...prevousState.style,
        panel: panel
      }
    }))
  }

  setRGBFromHex = (hexValue) => {
    this.setState({
      red : parseInt((hexValue).substring(1,3),16),
      green : parseInt((hexValue).substring(3,5),16),
      blue : parseInt((hexValue).substring(5,7),16)
    })
  }

  setHSLFromHex = (hexValue) => {
    let red = parseInt((hexValue).substring(1,3),16)/255;
    let green = parseInt((hexValue).substring(3,5),16)/255;
    let blue = parseInt((hexValue).substring(5,7),16)/255;

    let max = Math.max(red, green, blue);
    let min = Math.min(red, green, blue);

    let lightness = (min + max) / 2;
    let hue, saturation;
    if (max === min) {
      hue = 0;
      saturation = 0;
    }
    else {
      let delta = max - min;
      if (lightness > 0.5) {
        saturation = delta / (2 - max - min);
      }
      else {
        saturation = delta / (max + min);
      }

      switch(max){
        case red: hue = (green - blue) / delta; break;
        case green: hue = (blue - red) / delta + 2; break;
        case blue: hue = (red - green) / delta + 4; break;
      }
      hue *= 60;
    }

    this.setState({
      hue: hue > 0 ? hue : hue + 360,
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100)
    })
  }

  determineTextColor = (red, green, blue) => {
    var nThreshold = 105;
    var bgDelta = (red * 0.299) + (green * 0.587) + (blue * 0.114);
    return (255 - bgDelta < nThreshold) ? 'black' : 'white';
  }

  handleChange = (event) => {
    if (event.target.name === 'hex' && /^#[0-9A-F]{6}$/i.test(event.target.value)) {
      let panel = { ...this.state.style.panel }
      panel.backgroundColor = event.target.value
      this.setState(prevousState => ({
        style: {
          ...prevousState.style,
          panel: panel
        }
      }))
      this.setRGBFromHex(event.target.value);
      this.setHSLFromHex(event.target.value);
      let textColor = this.determineTextColor(this.state.red, this.state.green, this.state.blue);
      this.setState({textColor : textColor})
    }
    if(!/^#/i.test(event.target.value)){
      event.target.value = '#' + event.target.value;
    }
    this.setState({ [event.target.name]: event.target.value })

  }

  onSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('api/color', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        hex: this.state.hex,
        rgb: {
          red: this.state.red,
          green: this.state.green,
          blue: this.state.blue,
        },
        hsl: {
          hue: this.state.hue,
          saturation: this.state.saturation,
          lightness: this.state.lightness,
        }
      })
    }).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
    console.log(response);

    this.setState({
      name: '',
      hex: '',
      red: '',
      green: '',
      blue: '',
      hue: '',
      saturation: '',
      lightness: '',
      visible: false,
      textColor: 'black'
    })
  }

	render() {
		return (
      <div style={this.props.visible ? this.state.style.container : this.state.style.containerHidden}>
        <form style={this.state.visible ? this.state.style.panel : this.state.style.panelHidden}
            onSubmit={this.onSubmit}>
          <span className="Field" style={{color : this.state.textColor}}>
            Color Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Hex Value: <input type="text" name="hex" value={this.state.hex} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Red Value: <input type="text" name="red" value={this.state.red} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Green Value: <input type="text" name="green" value={this.state.green} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Blue Value: <input type="text" name="blue" value={this.state.blue} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Hue Value: <input type="text" name="hue" value={this.state.hue} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Saturation Value: <input type="text" name="saturation" value={this.state.saturation} onChange={this.handleChange} />
          </span>
          <span className="Field" style={{color : this.state.textColor}}>
            Lightness Value: <input type="text" name="lightness" value={this.state.lightness} onChange={this.handleChange} />
          </span>
          <span className="Submit" style={{color : this.state.textColor}}>
            <input type="submit" value="Submit" />
          </span>
        </form>
        <div style={this.state.visible ? this.state.style.mask : this.state.style.maskHidden} onClick={this.props.onClickAway ? this.props.onClickAway : null} />
      </div>
		)
	}

}

export default Modal;