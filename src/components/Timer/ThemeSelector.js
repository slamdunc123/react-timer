import React, { useState } from 'react';
import {
	BlockPicker,
	TwitterPicker,
	SketchPicker,
	ChromePicker,
} from 'react-color';
import { MdFormatColorFill } from 'react-icons/md';
import { MdFormatColorText } from 'react-icons/md';

const ThemeSelector = () => {
	const [backgroundColor, setBackgroundColor] = useState('#2299f9');
	const [textColor, setTextColor] = useState('#ffffff');
	const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
		useState(false);
	const [showTextColorPicker, setShowTextColorPicker] = useState(false);

	const handleBackgroundColorsChange = ({ hex }) => {
		setBackgroundColor(hex);
		document.querySelector(
			'.twinkl-timer-app-container'
		).style.backgroundColor = hex;
	};

	const handleTextColorChange = ({ hex }) => {
		setTextColor(hex);
		document.querySelector('.twinkl-timer-app-container').style.color = hex;
	};

	return (
		<div className='twinkl-timer-theme-colors-container'>
			<MdFormatColorFill
				onClick={() =>
					setShowBackgroundColorPicker(!showBackgroundColorPicker)
				}
			/>

			{showBackgroundColorPicker ? (
				<TwitterPicker
					className='twinkl-timer-theme-color-picker'
					style={{ marginTop: '10px !important' }}
					color={backgroundColor}
					onChangeComplete={(color) => {
						handleBackgroundColorsChange(color);
					}}
				/>
			) : null}
			<MdFormatColorText
				onClick={() => setShowTextColorPicker(!showTextColorPicker)}
			/>
			{showTextColorPicker ? (
				<TwitterPicker
					className='twinkl-timer-theme-color-picker'
					color={textColor}
					onChangeComplete={(color) => {
						handleTextColorChange(color);
					}}
				/>
			) : null}
			{/* <button onClick={handleThemeColorsChange}>Change</button> */}
		</div>
	);
};

export default ThemeSelector;
