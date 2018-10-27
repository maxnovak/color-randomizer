import React, { Component } from 'react';
import style from './style.js';

class Modal extends Component {
	constructor(props) {
		super(props);
    console.log('construct it ');
    this.state = {
      style: style
    }
	}

  componentWillReceiveProps({visible}) {
    this.setState({
        visible : visible
    });
  }

	render() {
		return (
      <div style={this.props.visible ? this.state.style.container : this.state.style.containerHidden}>
        <form style={this.state.visible ? this.state.style.panel : this.state.style.panelHidden}>
          Color Name: <input type="text" name="name" />
          Hex Value: <input type="text" name="hex" />
          Red Value: <input type="text" name="red" />
          Green Value: <input type="text" name="green" />
          Blue Value: <input type="text" name="blue" />
          Hue Value: <input type="text" name="hue" />
          Saturation Value: <input type="text" name="saturation" />
          Lightness Value: <input type="text" name="lightness" />
        </form>
        <div style={this.state.visible ? this.state.style.mask : this.state.style.maskHidden} onClick={this.props.onClickAway ? this.props.onClickAway : null} />
      </div>
		)
	}

}

export default Modal;