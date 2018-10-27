import React, { Component } from 'react';

class AddColor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="AddColor"
        style=
        {{
          backgroundColor: this.props.colorHex,
          color: this.props.textColor
        }}
        onClick= {
          this.props.showForm
        }
        >
      Add a Color
      </button>
		)
	}
}

export default AddColor;