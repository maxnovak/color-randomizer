import React, { Component } from 'react';

class AddColor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        style = {{
          backgroundColor: this.props.colorHex,
          color: this.props.textColor
        }}>
      hello world
      </button>
		)
	}
}

export default AddColor;