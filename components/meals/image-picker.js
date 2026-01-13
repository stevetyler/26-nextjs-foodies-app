"use client";
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({ name , label }) {
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.control}>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg" 
                    ref={imageInput}
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>Choose Image</button>
            </div>
        </div>
    )
}