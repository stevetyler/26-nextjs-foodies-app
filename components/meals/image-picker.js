"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ name , label }) {
    const [pickedImage, setPickedImage] = useState(null);       
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = function() {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.control}>
                <div className={classes.preview}>
                    {pickedImage ? (
                        <Image 
                            src={pickedImage} 
                            alt="Picked Meal" 
                            fill 
                        />
                    ) : (
                        <p>No image picked yet.</p>
                    )}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg" 
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>Choose Image</button>
            </div>
        </div>
    )
}