import React, { Component } from 'react';

class NewColorButton extends Component {
  render() {
    return (
      <button
        className='NewColor'
        onClick={ this.props.getNewColor }
        style = {{
          backgroundColor: this.props.colorHex,
          color: this.props.textColor
        }}>
      Get New Color
      </button>
    )
  }
}

export default NewColorButton;