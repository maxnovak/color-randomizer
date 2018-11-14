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
      lightness: ''
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

  handleChange = (event) => {
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
      visible: false
    })
  }

	render() {
		return (
      <div style={this.props.visible ? this.state.style.container : this.state.style.containerHidden}>
        <form style={this.state.visible ? this.state.style.panel : this.state.style.panelHidden}
            onSubmit={this.onSubmit}>
          <span className="Field">
            Color Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Hex Value: <input type="text" name="hex" value={this.state.hex} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Red Value: <input type="text" name="red" value={this.state.red} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Green Value: <input type="text" name="green" value={this.state.green} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Blue Value: <input type="text" name="blue" value={this.state.blue} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Hue Value: <input type="text" name="hue" value={this.state.hue} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Saturation Value: <input type="text" name="saturation" value={this.state.saturation} onChange={this.handleChange} />
          </span>
          <span className="Field">
            Lightness Value: <input type="text" name="lightness" value={this.state.lightness} onChange={this.handleChange} />
          </span>
          <span className="Submit">
            <input type="submit" value="Submit" />
          </span>
        </form>
        <div style={this.state.visible ? this.state.style.mask : this.state.style.maskHidden} onClick={this.props.onClickAway ? this.props.onClickAway : null} />
      </div>
		)
	}

}

export default Modal;