import React from 'react';
import './Input.css';

const Input=({
    labelText,
    placeholderText='',
    onChange,
    type='text',
    value,
})=>{
    return(
        <div className='input-components'>
            <label>{labelText}</label>
            <input
            type={type}
            placeholder={placeholderText}
            onChange={onChange}
            value={value}
            />
        </div>
    )
}

export default Input;