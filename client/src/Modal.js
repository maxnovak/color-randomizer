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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    console.log(this.state);
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
    event.preventDefault();
  }

	render() {
		return (
      <div style={this.props.visible ? this.state.style.container : this.state.style.containerHidden}>
        <form style={this.state.visible ? this.state.style.panel : this.state.style.panelHidden}
            onSubmit={this.onSubmit}>
          Color Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          Hex Value: <input type="text" name="hex" value={this.state.hex} onChange={this.handleChange} />
          Red Value: <input type="text" name="red" value={this.state.red} onChange={this.handleChange} />
          Green Value: <input type="text" name="green" value={this.state.green} onChange={this.handleChange} />
          Blue Value: <input type="text" name="blue" value={this.state.blue} onChange={this.handleChange} />
          Hue Value: <input type="text" name="hue" value={this.state.hue} onChange={this.handleChange} />
          Saturation Value: <input type="text" name="saturation" value={this.state.saturation} onChange={this.handleChange} />
          Lightness Value: <input type="text" name="lightness" value={this.state.lightness} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <div style={this.state.visible ? this.state.style.mask : this.state.style.maskHidden} onClick={this.props.onClickAway ? this.props.onClickAway : null} />
      </div>
		)
	}

}

export default Modal;