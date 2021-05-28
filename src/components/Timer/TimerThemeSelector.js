import React, { useState} from 'react'

const TimerThemeSelector = () => {

    const [backgroundColor, setBackgroundColor] = useState('#2299f9');
	const [textColor, setTextColor] = useState('#ffffff');

    const handleThemeColorsChange = () => {
		document.body.style.backgroundColor = backgroundColor;
		document.body.style.color = textColor;
	};
    return (
        <div className='theme-colors'>
					<p>Choose theme colors:</p>
					<input
						type='color'
						value={backgroundColor}
						onChange={(e) => setBackgroundColor(e.target.value)}
						id='backgroundcolor'
					/>
					<label htmlFor='backgroundcolor'>Background Color:</label>
					<input
						type='color'
						value={textColor}
						onChange={(e) => setTextColor(e.target.value)}
						id='textcolor'
					/>
					<label htmlFor='textcolor'>Text Color:</label>
					<button onClick={handleThemeColorsChange}>Change</button>
				</div>
    )
}

export default TimerThemeSelector
