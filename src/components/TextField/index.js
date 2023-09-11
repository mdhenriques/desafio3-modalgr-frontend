import { useState } from 'react'
import './TextField.css'

const TextField = (props) => {

    //let inputValue = ''

   

    const onType = (event) => {
        props.onAlter(event.target.value)
    }

    return (
        <div className="text-field">
            <label>{props.label}</label>
            <input value={props.inputValue} onChange={onType} placeholder={props.placeholder} type={props.type}/>
        </div>
    )
}

export default TextField;