import React, { useState } from 'react';
import { SketchPicker, ChromePicker } from 'react-color';

const ThemeSelector = () => {
	const [backgroundColor, setBackgroundColor] = useState('#2299f9');
	const [textColor, setTextColor] = useState('#ffffff');
	const [showBackgroundColorPicker, setShowBackgroundColorPicker] =
		useState(false);
	const [showTextColorPicker, setShowTextColorPicker] = useState(false);

	const handleBackgroundColorsChange = ({ hex }) => {
		setBackgroundColor(hex);
		document.querySelector('.twinkl-timer-app-container').style.backgroundColor = hex;
	};

	const handleTextColorChange = ({ hex }) => {
		setTextColor(hex);
		document.querySelector('.twinkl-timer-app-container').style.color = hex;
	};

	return (
		<div className='twinkl-timer-theme-colors'>
			<button
				onClick={() =>
					setShowBackgroundColorPicker(!showBackgroundColorPicker)
				}
			>
				Background
			</button>
			{showBackgroundColorPicker ? (
				<ChromePicker
					color={backgroundColor}
					onChangeComplete={(color) => {
						handleBackgroundColorsChange(color);
					}}
				/>
			) : null}
			<button
				onClick={() => setShowTextColorPicker(!showTextColorPicker)}
			>
				Text
			</button>
			{showTextColorPicker ? (
				<ChromePicker
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
