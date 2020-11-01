import React, { useEffect, useState } from 'react';
import './App.css';
import NewColorButton from './NewColorButton.js';
import AddColor from './AddColor.js'
import Modal from './Modal.js'

const App = () => {
  const [color, setColor] = useState({});
  const [rgb, setRGB] = useState({});
  const [hsl, setHSL] = useState({});
  const [textColor, setTextColor] = useState('black');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getNewColor();
  },[]);

  const callApi = async () => {
    const response = await fetch('/api/color/random');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const determineTextColor = (red, green, blue) => {
    var nThreshold = 105;
    var bgDelta = (red * 0.299) + (green * 0.587) + (blue * 0.114);
    return (255 - bgDelta < nThreshold) ? 'black' : 'white';
  }

  const getNewColor = () => {
    callApi()
      .then(res => {
        setColor(res);
        setTextColor(determineTextColor(res.rgb.red, res.rgb.green, res.rgb.blue));
        setRGB(res.rgb);
        setHSL(res.hsl);
      }
      )
      .catch(err => console.log(err));
  }

  const showForm = () => {
    setVisible(true);
  }

  const closeModal = () => {
    setVisible(false);
  }

  return (
    <div>
      <div className="App" style={{backgroundColor : color.hex, color : textColor}}>
        <span>
          <div className="NameOfColor"> {color.name} </div>
          {color.hex} <br/>
          RGB: {rgb.red}, {rgb.green}, {rgb.blue} <br/>
          HSL: {hsl.hue}, {hsl.saturation}, {hsl.lightness}
        </span>
        <Modal
          visible={visible}
          onClickAway={() => closeModal()}
        />
        <AddColor
          showForm={showForm}
          colorHex={color.hex}
          textColor={textColor}
          />
        <NewColorButton
          getNewColor={getNewColor}
          colorHex={color.hex}
          textColor={textColor} />
      </div>
    </div>
  );
}

export default App;
