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
      let textColor = this.determineTextColor(this.state.red, this.state.green, this.state.blue);
      console.log(textColor);
      this.setState({textColor : textColor})
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