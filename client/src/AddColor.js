import React from 'react';

const AddColor = (props) => {
  const {
    colorHex,
    textColor,
    showForm,
  } = props;

  return (
    <button
      className="AddColor"
      style=
      {{
        backgroundColor: colorHex,
        color: textColor
      }}
      onClick= {
        showForm
      }
      >
    Add a Color
    </button>
  )
}

export default AddColor;