import React, { useState, useEffect } from 'react';

const CountDownTimer = () => {
	const hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
	const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
	const [[startHrs, startMins, startSecs], setStartTime] = useState([
		hours,
		minutes,
		seconds,
	]);

	const [counterOn, setCounterOn] = useState(false);

	const handleHoursChange = (e) => {
		setTime([e.target.value, mins, secs]);
		setStartTime([e.target.value, mins, secs]);
	};
	const handleMinutesChange = (e) => {
		setTime([hrs, e.target.value, secs]);
		setStartTime([hrs, e.target.value, secs]);
	};
	const handleSecondsChange = (e) => {
		setTime([hrs, mins, e.target.value]);
		setStartTime([hrs, mins, e.target.value]);
	};

	const tick = () => {
		if (hrs === 0 && mins === 0 && secs === 0) setCounterOn(false);
		else if (mins === 0 && secs === 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs === 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	};

	const reset = () =>
		setTime([parseInt(startHrs), parseInt(startMins), parseInt(startSecs)]);

	const renderControls = () => {
		let button = <button onClick={() => setCounterOn(true)}>Start</button>;
		if (
			!counterOn &&
			(hrs === startHrs || hrs === 0) &&
			(mins === startMins || mins === 0) &&
			(secs === startSecs || secs === 0)
		) {
			button = (
				<button
					onClick={() => setCounterOn(true)}
					disabled={hrs === 0 && mins === 0 && secs === 0}
				>
					Start
				</button>
			);
		} else if (
			!counterOn &&
			(hrs < startHrs || mins < startMins || secs < startSecs)
		) {
			button = <button onClick={() => setCounterOn(true)}>Resume</button>;
		}
		if (counterOn) {
			button = <button onClick={() => setCounterOn(false)}>Pause</button>;
		}

		return (
			<>
				{button}
				<button
					onClick={() => reset()}
					disabled={
						counterOn ||
						(!counterOn && hrs > 0 && mins > 0 && secs > 0)
					}
				>
					Reset
				</button>
			</>
		);
	};

	const colorIndicator = () => {
		let color;
		if (secs > 50) {
			color = 'green';
		} else if (secs <= 50 && secs >= 10) {
			color = 'orange';
		} else color = 'red';
		return color;
	};

	useEffect(() => {
		if (counterOn) {
			const timer = setInterval(() => tick(), 1000);
			return () => clearInterval(timer);
		}
	});

	return (
		<div className='twinkl-counter-display-container'>
			<div className='twinkl-counter-display'>
				<div className='twinkl-counter-unit'>
					{hrs.toString().padStart(2, '0')}
					<input
						type='number'
						min='0'
						max='59'
						value={hrs}
						onChange={handleHoursChange}
					/>
				</div>
				<div className='twinkl-counter-unit'>
					{mins.toString().padStart(2, '0')}
					<input
						type='number'
						min='0'
						max='59'
						value={mins}
						onChange={handleMinutesChange}
					/>
				</div>
				<div className='twinkl-counter-unit'>
					{secs.toString().padStart(2, '0')}
					<input
						type='number'
						min='0'
						max='59'
						value={secs}
						onChange={handleSecondsChange}
					/>
				</div>
			</div>
			<div className='twinkl-counter-controls'>{renderControls()}</div>
			<div
				style={{
					width: '100px',
					height: '100px',
					backgroundColor: colorIndicator(),
				}}
			></div>
		</div>
	);
};

export default CountDownTimer;
