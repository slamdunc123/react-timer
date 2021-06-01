import React, { useState, useEffect } from 'react';
import './styles.css';

const Countdown = () => {
	const [counter, setCounter] = useState(0);
	const [counterStartValue, setCounterStartValue] = useState(0);
	const [counterOn, setCounterOn] = useState(false);

	const handleCounterValueChange = (e) => {
		setCounter(e.target.value);
		setCounterStartValue(e.target.value);
	};

	const renderControls = () => {
		let button = <button onClick={() => setCounterOn(true)}>Start</button>;
		if (!counterOn && (counter === counterStartValue || counter === 0)) {
			button = (
				<button
					onClick={() => setCounterOn(true)}
					disabled={counter === 0}
				>
					Start
				</button>
			);
		} else if (!counterOn && counter < counterStartValue) {
			button = <button onClick={() => setCounterOn(true)}>Resume</button>;
		}
		if (counterOn) {
			button = <button onClick={() => setCounterOn(false)}>Pause</button>;
		}

		return (
			<>
				{button}
				<button
					onClick={() => setCounter(counterStartValue)}
					disabled={counterOn}
				>
					Reset
				</button>
			</>
		);
	};

	useEffect(() => {
		let interval;
		if (counterOn) {
			interval = setInterval(
				() => setCounter((preCounter) => preCounter - 1),
				1000
			);
		}
		return () => clearInterval(interval);
	}, [counterOn]);

	useEffect(() => {
		if (counter === 0) setCounterOn(false);
	}, [counter]);

	return (
		<div className='twinkl-counter-display-container'>
			<div className='twinkl-counter-display'>
				<div className='twinkl-counter-unit'>{counter}</div>
			</div>
			<div className='twinkl-counter-controls'>{renderControls()}</div>
			<input
				type='number'
				min='1'
				max='100'
				value={counter}
				onChange={handleCounterValueChange}
			/>Start Time
		</div>
	);
};

export default Countdown;
