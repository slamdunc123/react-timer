import React, { useState, useEffect, useCallback } from 'react';
import TimerModal from './TimerModal';
import TimerInputs from './TimerInputs';
import { GoSettings } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

const BasicTimer = ({ timerType }) => {
	const [[hrs, mins, secs], setTime] = useState([0, 0, 0]);
	const [[startHrs, startMins, startSecs], setStartTime] = useState([
		0, 0, 0,
	]);
	const [counterOn, setCounterOn] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleHoursChange = (e) => {
		setTime([e.value, mins, secs]);
		setStartTime([e.value, mins, secs]);
	};
	const handleMinutesChange = (e) => {
		setTime([hrs, e.value, secs]);
		setStartTime([hrs, e.value, secs]);
	};
	const handleSecondsChange = (e) => {
		setTime([hrs, mins, e.value]);
		setStartTime([hrs, mins, e.value]);
	};

	const startCounter = useCallback(() => {
		console.log('running');
		if (hrs == 0 && mins == 0 && secs == 0) setCounterOn(false);
		else if (mins == 0 && secs == 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs == 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	}, [hrs, mins, secs]);

	const resetCounter = () =>
		setTime([parseInt(startHrs), parseInt(startMins), parseInt(startSecs)]);

	const handleClearCounterInputs = () => {
		setTime([0, 0, 0]);
		setStartTime([0, 0, 0]);
	};

    const renderControls = () => {
		let button = <button onClick={() => setCounterOn(true)} disabled={hrs == 0 && mins == 0 && secs == 0}>Start</button>;
		if (
			!counterOn &&
			(hrs === startHrs || hrs === 0) &&
			(mins === startMins || mins === 0) &&
			(secs === startSecs || secs === 0)
		) {
			button = (
				<button
					onClick={() => setCounterOn(true)}
					disabled={hrs == 0 && mins == 0 && secs == 0}
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
        if (counterOn && (hrs > 0 || mins > 0 || secs > 0)) {
			button = <button onClick={() => setCounterOn(false)}>Pause</button>;
		}

		return (
			<div className='twinkl-counter-controls'>
				{button}
				<button onClick={() => resetCounter()} disabled={counterOn || (!counterOn && hrs === startHrs && mins === startMins && secs === startSecs)}>
					Reset
				</button>
			</div>
		);
	};

	const renderCounterInputs = () => {
		if (counterOn) return;
		return (
			<TimerInputs
				timerType={timerType}
				startHrs={startHrs}
				startMins={startMins}
				startSecs={startSecs}
				onHoursChange={handleHoursChange}
				onMinutesChange={handleMinutesChange}
				onSecondsChange={handleSecondsChange}
			/>
		);
	};

	const modalBody = (
		<>
			<MdClose
				className='twinkl-counter-modal-close-button'
				onClick={() => setIsModalOpen(false)}
			>
				close
			</MdClose>
			{renderCounterInputs()}
            <button
				className='twinkl-counter-modal-clear-button'
				onClick={() => setIsModalOpen(false)}
			>
				Set
			</button>
			<button
				className='twinkl-counter-modal-clear-button'
				onClick={handleClearCounterInputs}
			>
				Clear
			</button>
		</>
	);

	useEffect(() => {
		let interval;

		if (counterOn) {
			interval = setInterval(() => startCounter(), 1000);
		}
		return () => clearInterval(interval);
	}, [counterOn, startCounter]);

	return (
		<>
			<TimerModal isModalOpen={isModalOpen} modalBody={modalBody} />
			<div className='twinkl-counter-display-container'>
				<div className='twinkl-counter-display'>
					<div className='twinkl-counter-unit'>
						{hrs.toString().padStart(2, '0')}
						<span>hrs</span>
					</div>
					<div className='twinkl-counter-unit'>
						{mins.toString().padStart(2, '0')}
						<span>mins</span>
					</div>
					<div className='twinkl-counter-unit'>
						{secs.toString().padStart(2, '0')}
						<span>secs</span>
					</div>
				</div>
				{renderControls()}
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

export default BasicTimer;
