import React, { useState, useEffect } from 'react';
import './styles.css';

const Stopwatch = () => {
	const [counter, setCounter] = useState(0);
	const [counterOn, setCounterOn] = useState(false);
	
	const calculateMinutes = () => {
		return ('0' + Math.floor((counter / 60000) % 60)).slice(-2);
	};
	const calculateSeconds = () => {
		return ('0' + Math.floor((counter / 1000) % 60)).slice(-2);
	};
	const calculateMilliseconds = () => {
		return ('0' + ((counter / 10) % 100)).slice(-2);
	};

	const renderControls = () => {
		let button = <button onClick={() => setCounterOn(true)}>Start</button>;
		if (!counterOn && counter === 0) {
			button = <button onClick={() => setCounterOn(true)}>Start</button>;
		} else if (!counterOn && counter > 0) {
			button = <button onClick={() => setCounterOn(true)}>Resume</button>;
		}
		if (counterOn) {
			button = <button onClick={() => setCounterOn(false)}>Pause</button>;
		}

		return (
			<>
				{button}
				<button
					onClick={() => setCounter(0)}
					disabled={counterOn || (!counterOn && counter === 0)}
				>
					Reset
				</button>
			</>
		);
	};

	useEffect(() => {
		let interval = null;

		if (counterOn) {
			interval = setInterval(() => {
				setCounter((prevTime) => prevTime + 10); // increase the counter by 10 milliseconds (100th of a second) every 10 milliseconds
			}, 10);
		} else if (!counterOn) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [counterOn]);

	return (
			<div className='twinkl-counter-display-container'>
				<div className='twinkl-counter-display'>
					<div className='twinkl-counter-unit'>{calculateMinutes()}</div>
					<div className='twinkl-counter-unit'>{calculateSeconds()}</div>
					<div className='twinkl-counter-unit'>{calculateMilliseconds()}</div>
				</div>

				<div className='twinkl-counter-controls'>{renderControls()}</div>
			</div>
	);
};

export default Stopwatch;
