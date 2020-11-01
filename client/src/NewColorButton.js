import React from 'react';

const NewColorButton = (props) => {
  const {
    getNewColor,
    colorHex,
    textColor,
  } = props;

  return (
    <button
      className='NewColor'
      onClick={ getNewColor }
      style = {{
        backgroundColor: colorHex,
        color: textColor
      }}>
    Get New Color
    </button>
  )
};

export default NewColorButton;