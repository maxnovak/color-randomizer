import React, { Component } from 'react';

class Modal extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
      <div style={{display: this.props.visible}}>
        blahblahblah
        <input />
      </div>
		)
	}

}

export default Modal;