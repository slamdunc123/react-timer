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
					disabled={
						counterOn ||
						(!counterOn && counter > 0)
					}
				>
					Reset
				</button>
			</>
		);
	};

	useEffect(() => {
		if (counterOn) {
			let timer =
				counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
			return () => clearInterval(timer);
		}
	}, [counter, counterOn]);

    useEffect(() => {
if (counter === 0) setCounterOn(false)
    }, [counter])

	return (
		<div className='twinkl-counter-unit'>
			{counter}
			<input
				type='number'
				min='1'
				max='100'
				value={counter}
				onChange={handleCounterValueChange}
			/>
			<div className='twinkl-counter-controls'>{renderControls()}</div>
		</div>
	);
};

export default Countdown;
