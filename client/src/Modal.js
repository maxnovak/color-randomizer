import React, { useState, useEffect } from 'react';
import style from './style.js';

const Modal = (props) => {
  const {
    visible,
    onClickAway,
  } = props;

  const [name, setName] = useState('');
  const [hex, setHex] = useState('');
  const [red, setRed] = useState('');
  const [green, setGreen] = useState('');
  const [blue, setBlue] = useState('');
  const [hue, setHue] = useState('');
  const [saturation, setSaturation] = useState('');
  const [lightness, setLightness] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [cssStyle, setCSSStyle] = useState(style);


  useEffect(() => {
    if (red !== '' && blue !== '' && green !== ''){
      setTextColor(determineTextColor());
    }
  }, [red, blue, green]);

  const setRGBFromHex = (hexValue) => {
    setRed(parseInt((hexValue).substring(1,3),16));
    setGreen(parseInt((hexValue).substring(3,5),16));
    setBlue(parseInt((hexValue).substring(5,7),16));
  }

  const setHSLFromHex = (hexValue) => {
    const redFromHex = parseInt((hexValue).substring(1,3),16)/255;
    const greenFromHex = parseInt((hexValue).substring(3,5),16)/255;
    const blueFromHex = parseInt((hexValue).substring(5,7),16)/255;

    const max = Math.max(redFromHex, greenFromHex, blueFromHex);
    const min = Math.min(redFromHex, greenFromHex, blueFromHex);

    const calculatedLightness = (min + max) / 2;
    let calculatedHue, calculatedSaturation;
    if (max === min) {
      calculatedHue = 0;
      calculatedSaturation = 0;
    }
    else {
      let delta = max - min;
      if (calculatedLightness > 0.5) {
        calculatedSaturation = delta / (2 - max - min);
      }
      else {
        calculatedSaturation = delta / (max + min);
      }

      switch(max){
        case redFromHex: calculatedHue = (greenFromHex - blueFromHex) / delta; break;
        case greenFromHex: calculatedHue = (blueFromHex - redFromHex) / delta + 2; break;
        case blueFromHex: calculatedHue = (redFromHex - greenFromHex) / delta + 4; break;
      }
      calculatedHue *= 60;
    }


    setHue(calculatedHue > 0 ? calculatedHue : calculatedHue + 360);
    setSaturation(Math.round(calculatedSaturation * 100));
    setLightness(Math.round(calculatedLightness * 100));
  }

  const determineTextColor = () => {
    var nThreshold = 105;
    var bgDelta = (red * 0.299) + (green * 0.587) + (blue * 0.114);
    return (255 - bgDelta < nThreshold) ? 'black' : 'white';
  }

  const handleChange = async (hexValue) => {
    if(!/^#/i.test(hexValue)){
      hexValue = '#' + hexValue;
    }

    if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
      let panel = { ...cssStyle.panel }
      panel.backgroundColor = hexValue
      setCSSStyle({
        ...cssStyle,
        panel: panel,
      })

      setRGBFromHex(hexValue);
      setHSLFromHex(hexValue);
    }
    setHex(hexValue);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/color', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          hex,
          rgb: {
            red,
            green,
            blue,
          },
          hsl: {
            hue,
            saturation,
            lightness,
          }
        })
      });
      console.info(response);
    } catch(error) {
      console.error(error);
    };

    onClickAway();
  }

  return (
    <div style={visible ? cssStyle.container : cssStyle.containerHidden}>
      <form style={visible ? cssStyle.panel : cssStyle.panelHidden}
          onSubmit={onSubmit}>
        <span className="Field" style={{color : textColor}}>
          <label>Color Name:
            <input type="text" name="name" value={name} onChange={(event) => setName(event.target.value)}/>
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Hex Value:
            <input type="text" name="hex" value={hex} onChange={(event) => handleChange(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Red Value:
            <input type="text" name="red" value={red} onChange={(event) => setRed(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Green Value:
            <input type="text" name="green" value={green} onChange={(event) => setGreen(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Blue Value:
            <input type="text" name="blue" value={blue} onChange={(event) => setBlue(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Hue Value:
            <input type="text" name="hue" value={hue} onChange={(event) => setHue(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Saturation Value:
            <input type="text" name="saturation" value={saturation} onChange={(event) => setSaturation(event.target.value)} />
          </label>
        </span>
        <span className="Field" style={{color : textColor}}>
          <label>Lightness Value:
            <input type="text" name="lightness" value={lightness} onChange={(event) => setLightness(event.target.value)} />
          </label>
        </span>
        <span className="Submit" style={{color : textColor}}>
          <input type="submit" value="Submit" />
        </span>
      </form>
      <div style={visible ? cssStyle.mask : cssStyle.maskHidden} onClick={onClickAway ? onClickAway : null} />
    </div>
  )

};

export default Modal;