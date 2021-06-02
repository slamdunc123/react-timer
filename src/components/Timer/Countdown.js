import React, { useState, useEffect } from 'react';
import './styles.css';
import { GoSettings } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import TimerModal from './TimerModal';

const Countdown = () => {
	const [counter, setCounter] = useState(0);
	const [counterStartValue, setCounterStartValue] = useState(0);
	const [counterOn, setCounterOn] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const modalBody = (
		<>
			<MdClose
				style={{ color: 'white' }}
				onClick={() => setIsModalOpen(false)}
			>
				close
			</MdClose>
			<div className='twinkl-counter-input-container'>
				<div className='twinkl-counter-input-group'>
					<input
						className='twinkl-counter-input'
						type='number'
						min='1'
						max='100'
						value={counter}
						onChange={handleCounterValueChange}
					/>
					<span>Start Time</span>
				</div>
			</div>
		</>
	);

	return (
		<>
			<TimerModal isModalOpen={isModalOpen} modalBody={modalBody} />
			<div className='twinkl-counter-display-container'>
				<div className='twinkl-counter-display'>
					<div className='twinkl-counter-unit'>{counter}</div>
				</div>
				<div className='twinkl-counter-controls'>
					{renderControls()}
				</div>
			</div>
			{!counterOn ? (
				<div className='twinkl-timer-modal-button'>
					<GoSettings onClick={() => setIsModalOpen(true)}>
						Open Modal
					</GoSettings>
				</div>
			) : null}
		</>
	);
};

export default Countdown;
