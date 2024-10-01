import React, { useEffect, useState } from 'react';
import { valInputByNumber } from '../../Modules/Functions';
import ReactSlider from 'react-slider';
import { useTranslation } from 'react-i18next';
import { useLayoutContext } from '../../Contexts/LayoutProvider';

const PRICE_RANGE = 1;

const DoubleRangeSlider = ({ vars, defaults, onChange, currency = 'currency_item', reset = false, resetFn=()=>{} }) => {
  // Common
  const { WCAG } = useLayoutContext();
  const { colors } = WCAG;
  const {t} = useTranslation();
  const { min: defaultMinValue, max: defaultMaxValue } = defaults;
  const { min: minValue, max: maxValue } = vars;
  // User Input Values
  const [userInput, setUserInput] = useState([minValue, maxValue]);
  // Register Input Values
  const [recordInput, setRecordInput] = useState([minValue, maxValue]);
  // React Slider Thumb Input Values
  const [reactSliderValues, setReactSliderValues] = useState([minValue, maxValue]);
  // Guards / Carat
  const [valueGuard, setValueGuard] = useState([true, true]);


  /*
  * Two Possibilities - Two Ways: 
  * w-A -> input - slider
  * w-B -> slider - input
  */

  useEffect(() => {
    if (reset) {
      setUserInput([minValue, maxValue]);
      setRecordInput([minValue, maxValue]);
      resetFn();
    }
  }, [reset]);

  useEffect(() => { // w-B:3 // w-A:6
    setReactSliderValues(recordInput);
    triggerChangeEvent(); // w-B:4 // w-A:7
  }, [recordInput]);

  /*
  * Change Handler
  *
  */
  const handleChangeReactSlider = (newValues) => { // w-B:1
    setUserInput(newValues); // w-B:2
    setRecordInput(newValues); // w-B:2
  }

  const handleMinChange = (e) => { // w-A:1
    const isRange = e.target.type === 'range';
    const validated = valInputByNumber(e.target.value);
    const value = Math.min(validated, recordInput[1] - PRICE_RANGE);
    setUserInput([ Math.round(isRange ? value : validated), userInput[1] ]); // w-A:2
  }

  const handleMaxChange = (e) => { // w-A:1
    const isRange = e.target.type === 'range';
    const validated = valInputByNumber(e.target.value);
    const value = Math.max(validated, recordInput[0] + PRICE_RANGE);
    setUserInput([ userInput[0], Math.round(isRange ? value : validated) ]); // w-A:2
  }

  /*
  * Confirms Input Handler with Keyboard // w-A:3
  *
  */
  const handleKeyEnter = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
      changeUserInput();
    }
  }

  /*
  * Tasks (calc & set states) // w-A:4
  *
  */
  const changeUserInput = () => {
    userInputToRecordMin(); // w-A:5
    userInputToRecordMax(); // w-A:5
    setValueGuardsTrue(); // w-A:7
  }

  const userInputToRecordMin = () => { // w-A:5
    if (userInput[0] !== recordInput[0] && userInput[0] !== '') {
      const value = Math.min(userInput[0], recordInput[1] - PRICE_RANGE);

      if (value < defaultMinValue) {
        setUserInput([ defaultMinValue, userInput[1] ]);
        setRecordInput([ defaultMinValue, recordInput[1] ]); // w-A:6
        
      } else {
        setRecordInput([ value, recordInput[1] ]); // w-A:6
      }
    }
  }

  const userInputToRecordMax = () => { // w-A:5
    if (userInput[1] !== recordInput[1] && userInput[1] !== '') {
      const value = Math.max(userInput[1], recordInput[0] + PRICE_RANGE);

      if (value > defaultMaxValue) {
        setUserInput([ userInput[0], defaultMaxValue ]);
        setRecordInput([ recordInput[0], defaultMaxValue ]); // w-A:6
        
      } else {
        setRecordInput([ recordInput[0], value ]); // w-A:6
      }
    }
  }

  /*
  * Guards
  *
  */
  const setValueGuardsTrue = () => { // w-A:7
    setValueGuard([
      (!valueGuard[0]) ? true : valueGuard[0],
      (!valueGuard[1]) ? true : valueGuard[1]
    ]);
  }

  const setMinValueGuardsFalse = () => { // w-A:0-1
    if (valueGuard[0]) setValueGuard([false, valueGuard[1]]);
    setUserInput(['','']);
  }

  const setMaxValueGuardsFalse = () => { // w-A:0-1
    if (valueGuard[1]) setValueGuard([valueGuard[0], false]);
    setUserInput(['','']);
  }

  /*
  * Get value back to parent - END // w-B:4 // w-A:7
  *
  */
  const triggerChangeEvent = () => { 
    if (onChange) {
      onChange({ target: { 
        name: 'price',
        value: `${recordInput[0] * 100}-${recordInput[1] * 100}` 
      } });
    }
  };

  return (
    <div id='range-slider'>
      <div className="slider-container">
        <div className='input-box'>
          <input 
            tabIndex={1}
            name="min" 
            min={defaultMinValue} 
            max={defaultMaxValue} 
            id="" 
            className={`range-input${valueGuard[0] ? ' guard' : ''}`}
            pattern='[0-9]*' 
            inputMode='numeric' 
            placeholder={`${recordInput[0]} ${t(currency)}`} 
            value={valueGuard[0] ? '' : userInput[0]}
            onChange={handleMinChange} // w-A:1
            // Set all guards true (if ...)
            onKeyDown={handleKeyEnter} // w-A:3
            onBlur={changeUserInput} // w-A:4
            // Set min guard false
            onFocus={setMinValueGuardsFalse} // w-A:0-1
            onClick={setMinValueGuardsFalse} // w-A:0-1
          />
          <b className='mx-4 nocaret noevent no-action'>&#8209;</b>{/* Dividing Line */}
          <input 
            tabIndex={1}
            name="max" 
            min={defaultMinValue} 
            max={defaultMaxValue} 
            id="" 
            className={`range-input${valueGuard[1] ? ' guard' : ''}`}
            pattern='[0-9]*' 
            inputMode='numeric' 
            placeholder={`${recordInput[1]} ${t(currency)}`} 
            value={valueGuard[1] ? '' : userInput[1]}
            onChange={handleMaxChange} // w-A:1
            // Set all guards true (if ...)
            onKeyDown={handleKeyEnter} // w-A:3
            onBlur={changeUserInput} // w-A:4
            // Set max guard false
            onFocus={setMaxValueGuardsFalse} // w-A:0-1
            onClick={setMaxValueGuardsFalse} // w-A:0-1
          />
        </div>

        <div className={`slider-box${colors ? '' : ' nocolor'}`}>
          <ReactSlider
            className='horizontal-slider'
            thumbClassName="thumb"
            trackClassName="track"
            value={reactSliderValues}
            onChange={handleChangeReactSlider} // w-B:1
            ariaLabel={['Lower thumb', 'Upper thumb']}
            ariaValuetext={state => `Thumb value ${state.valueNow}`}
            // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>} // Display input
            pearling={true}
            minDistance={PRICE_RANGE}
            min={defaultMinValue} 
            max={defaultMaxValue} 
          />
        </div>


      </div>
    </div>
  );
};

export default DoubleRangeSlider;

