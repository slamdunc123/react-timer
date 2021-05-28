import React, { useState, useEffect } from 'react';
import './styles.css';

const TimerDisplay = () => {
	const [time, setTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

	const elem = document.documentElement;

	const handleFullScreen = () => {
		if (!fullScreen) {
			setFullScreen(true);
			elem.requestFullscreen();
		} else {
			setFullScreen(false);
			document.exitFullscreen();
		}
	};

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
				<button onClick={handleFullScreen}>
					{fullScreen ? 'Minimise' : 'Full Screen'}
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
		<div className='page-container'>
			<div className='timer-container'>
				<div className='timer-display'>
					<div className='timer-unit'>{calculateMinutes()}</div>
					<div className='timer-unit'>{calculateSeconds()}</div>
					<div className='timer-unit'>{calculateMilliseconds()}</div>
				</div>

				<div className='timer-controls'>{renderControls()}</div>
			</div>
		</div>
	);
};

export default TimerDisplay;
