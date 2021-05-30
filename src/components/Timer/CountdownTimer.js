import React, { useState, useEffect } from 'react';

const CountDownTimer = () => {
	const hoursMinSecs = { hours: 1, minutes: 20, seconds: 40 };
	const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

	const tick = () => {
		if (hrs === 0 && mins === 0 && secs === 0) reset();
		else if (mins === 0 && secs === 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs === 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	};

	const reset = () =>
		setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	});

	return (
		<div className='twinkl-counter-display-container'>
			<div className='twinkl-counter-display'>
				<div className='twinkl-counter-unit'>
					{hrs.toString().padStart(2, '0')}
				</div>
				<div className='twinkl-counter-unit'>
					{mins.toString().padStart(2, '0')}
				</div>
				<div className='twinkl-counter-unit'>
					{secs.toString().padStart(2, '0')}
				</div>
			</div>
            {/* <div className='twinkl-counter-controls'>{renderControls()}</div> */}
		</div>
	);
};

export default CountDownTimer;
