import React, { Component } from 'react';

class Modal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <form style={{display: this.props.visible}}>
        Color Name: <input type="text" name="name" />
        Hex Value: <input type="text" name="hex" />
        Red Value: <input type="text" name="red" />
        Green Value: <input type="text" name="green" />
        Blue Value: <input type="text" name="blue" />
        Hue Value: <input type="text" name="hue" />
        Saturation Value: <input type="text" name="saturation" />
        Lightness Value: <input type="text" name="lightness" />
      </form>
		)
	}

}

export default Modal;