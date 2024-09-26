import React from 'react'

const RadioButton = ({ groupName, content, value, checked, index = 1, onChange = (e) => {console.log(e.target)} }) => {
  return (
    <label 
      className="radio-group" 
      htmlFor={groupName + index} 
      tabIndex={1}
      aria-label={content}
      role="radio"
    >
      <input
        type="radio" 
        name={groupName} 
        id={groupName + index} 
        value={value}
        checked={checked}
        aria-checked={checked}
        onChange={onChange} 
      />
      <span className="item"></span>
      <span className="content">{content}</span>
    </label>
  )
}

export default RadioButton
