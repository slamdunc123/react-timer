import React from 'react';

const TimerIndicator = ({
	currentTime,
	thresholdTimeOne,
	thresholdTimeTwo,
}) => {
	const getIndicatorColor = () => {
		let color;
		if (currentTime > thresholdTimeOne) {
			color = 'green';
		} else if (
			currentTime <= thresholdTimeOne &&
			currentTime > thresholdTimeTwo
		) {
			color = 'orange';
		} else color = 'red';

		return color;
	};

	return (
		<div className='twinkl-counter-indicator-container'>
			<div
				style={{
					width: '100px',
					height: '100px',
					borderRadius: '50%',
					backgroundColor: getIndicatorColor(),
				}}
			></div>
			<div
				style={{
					width: '100px',
					height: '100px',
					borderRadius: '50%',
					backgroundColor: getIndicatorColor(),
				}}
			></div>
			<div
				style={{
					width: '100px',
					height: '100px',
					borderRadius: '50%',
					backgroundColor: getIndicatorColor(),
				}}
			></div>
		</div>
	);
};

export default TimerIndicator;
