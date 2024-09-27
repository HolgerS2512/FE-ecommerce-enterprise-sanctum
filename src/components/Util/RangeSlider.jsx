import React, { useEffect, useState } from 'react';
import { useWindowSize, valInputByNumber } from '../../Modules/Functions';

const RangeSlider = ({ minValue = 0, maxValue = 500, defaultMinValue = 0, defaultMaxValue = 500, currency = '€' }) => {
  // Common
  const { width } = useWindowSize();
  // Input
  const [minInput, setMinInput] = useState(minValue);
  const [maxInput, setMaxInput] = useState(maxValue);
  // Input values
  const [minValueRs, setMinValueRs] = useState(minValue);
  const [maxValueRs, setMaxValueRs] = useState(maxValue);
  // Slider Values
  const [sliderWidth, setSliderWidth] = useState(minValue);
  const [sliderLeft, setSliderLeft] = useState(maxValue);
  // Slider Mouse events - client x
  const [maxSliderPosX, setMaxSliderPosX] = useState(null);
  const [minSliderPosX, setMinSliderPosX] = useState(null);
  // Stick length
  const [stickLength, setStickLength] = useState(316);
  // Guards / Carat
  const [valueGuardMin, setValueGuardMin] = useState(true);
  const [valueGuardMax, setValueGuardMax] = useState(true);

  useEffect(() => {
    calcSlider();
  }, [minValueRs, maxValueRs]);

  useEffect(() => {
    console.log(maxSliderPosX, minSliderPosX);
  }, [maxSliderPosX, minSliderPosX]);

  useEffect(() => { // Need for calculation stick btns
    const el = document.querySelector('.stick');
    // console.log(el.querySelectorAll('.range-btn'))
    setStickLength(el.clientWidth);
  }, [width]);

  /*
  * Change Handler
  *
  */
  const handleMinChange = (e) => setMinInput(Math.round(valInputByNumber(e.target.value)));
  const handleMaxChange = (e) => setMaxInput(Math.round(valInputByNumber(e.target.value)));

  /*
  * Confirms Input Handler
  *
  */
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      setUserInput();
    }
  }

  /*
  * Tasks (calc & set states)
  *
  */
  const setUserInput = () => {
    if (minInput !== minValueRs) {
      const value = Math.min(minInput, maxValueRs - 1);
      setMinValueRs(value);
    }
    if (maxInput !== maxValueRs) {
      const value = Math.max(maxInput, minValueRs + 1);
      if (value > defaultMaxValue) {
        setMaxInput(defaultMaxValue);
        setMaxValueRs(defaultMaxValue);
      } else {
        setMaxValueRs(value);
      }
    }
    setValueGuardsTrue();
  }

  const calcSlider = () => {
    const rest = maxValueRs - minValueRs;
    const resultMax = rest * 100 / defaultMaxValue;
    const resultMin = minInput * 100 / defaultMaxValue;
    setSliderWidth(resultMax);
    setSliderLeft(resultMin);
  }

  const setValueGuardsTrue = () => {
    if (!valueGuardMin) setValueGuardMin(true);
    if (!valueGuardMax) setValueGuardMax(true);
  }

  const setMinValueGuardsFalse = () => {
    if (valueGuardMin) setValueGuardMin(false);
  }

  const setMaxValueGuardsFalse = () => {
    if (valueGuardMax) setValueGuardMax(false);
  }

  /*
  * Sets mouse position
  *
  */
  const handleMouseEvent = (e) => {
    if (e.target.dataset.name === 'min') {
      setMinSliderPosX(e.clientX);
    } else if (e.target.dataset.name === 'max') {
      setMaxSliderPosX(e.clientX);
    }
  }

  return (
    <div id='range-slider'>
      <div className="slider-container">
        <div className='input-box'>
          <input 
            tabIndex={1}
            name="min" 
            id="" 
            className={`range-input${valueGuardMin ? ' guard' : ''}`}
            pattern='[0-9]*' 
            inputMode='numeric' 
            placeholder={`${minValueRs} ${currency}`} 
            value={valueGuardMin ? '' : minInput}
            onChange={handleMinChange}
            // Set guards true 
            onKeyDown={handleKeyEnter} 
            onBlur={setUserInput} 
            // Set min guard false
            onFocus={setMinValueGuardsFalse}
            onClick={setMinValueGuardsFalse}
          />
          <b className='mx-4'>&#8209;</b>{/* Dividing Line */}
          <input 
            tabIndex={1}
            name="max" 
            id="" 
            className={`range-input${valueGuardMax ? ' guard' : ''}`}
            pattern='[0-9]*' 
            inputMode='numeric' 
            placeholder={`${maxValueRs} ${currency}`} 
            value={valueGuardMax ? '' : maxInput}
            onChange={handleMaxChange}
            // Set guards true 
            onKeyDown={handleKeyEnter} 
            onBlur={setUserInput} 
            // Set max guard false
            onFocus={setMaxValueGuardsFalse}
            onClick={setMaxValueGuardsFalse}
          />
        </div>

        <div className="slider-box">
          <div className='stick'>
            <span className='range-stick' style={{ width: sliderWidth + '%', left: sliderLeft + '%' }}></span>
            <span 
              className='range-btn' 
              data-name='min'
              onTouchStart={(e) => {console.log(e)}}
              onTouchEnd={(e) => {console.log(e)}}
              style={{ left: `${sliderLeft - ( 20 * 100 / stickLength )}%` }}
              // Set to half -> ( 12 * 100 / stickLength )
            ></span>
            <span 
              className='range-btn' 
              data-name='max'
              onTouchStart={(e) => {console.log(e)}}
              onTouchEnd={(e) => {console.log(e)}}
              style={{ left: `${sliderLeft + sliderWidth - ( 20 * 100 / stickLength )}%` }}
            ></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RangeSlider;
