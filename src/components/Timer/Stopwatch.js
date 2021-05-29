import React, { useState, useEffect } from 'react';
import './styles.css';

const Stopwatch = () => {
	const [time, setTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	



	const calculateMinutes = () => {
		return ('0' + Math.floor((time / 60000) % 60)).slice(-2);
	};
	const calculateSeconds = () => {
		return ('0' + Math.floor((time / 1000) % 60)).slice(-2);
	};
	const calculateMilliseconds = () => {
		return ('0' + ((time / 10) % 100)).slice(-2);
	};

	const renderControls = () => {
		let button = <button onClick={() => setTimerOn(true)}>Start</button>;
		if (!timerOn && time === 0) {
			button = <button onClick={() => setTimerOn(true)}>Start</button>;
		} else if (!timerOn && time > 0) {
			button = <button onClick={() => setTimerOn(true)}>Resume</button>;
		}
		if (timerOn) {
			button = <button onClick={() => setTimerOn(false)}>Pause</button>;
		}

		return (
			<>
				{button}
				<button
					onClick={() => setTime(0)}
					disabled={timerOn || (!timerOn && time === 0)}
				>
					Reset
				</button>
			</>
		);
	};

	useEffect(() => {
		let interval = null;

		if (timerOn) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10); // increase the time by 10 milliseconds (100th of a second) every 10 milliseconds
			}, 10);
		} else if (!timerOn) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [timerOn]);

	return (
			<div className='twinkl-timer-display-container'>
				<div className='twinkl-timer-display'>
					<div className='twinkl-timer-unit'>{calculateMinutes()}</div>
					<div className='twinkl-timer-unit'>{calculateSeconds()}</div>
					<div className='twinkl-timer-unit'>{calculateMilliseconds()}</div>
				</div>

				<div className='twinkl-timer-controls'>{renderControls()}</div>
			</div>
	);
};

export default Stopwatch;
