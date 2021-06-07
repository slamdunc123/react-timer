import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import TimerIndicator from './TimerIndicator';
import TimerModal from './TimerModal';
import TimerInputs from './TimerInputs';
import { GoSettings } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

const Timer = ({ timerType }) => {
	const [[hrs, mins, secs], setTime] = useState([0, 0, 0]);
	const [
		[thresholdOneHrs, thresholdOneMins, thresholdOneSecs],
		setThresholdOneTime,
	] = useState([0, 0, 0]);
	const [
		[thresholdTwoHrs, thresholdTwoMins, thresholdTwoSecs],
		setThresholdTwoTime,
	] = useState([0, 0, 0]);
	const [[startHrs, startMins, startSecs], setStartTime] = useState([
		0, 0, 0,
	]);
	const [counterOn, setCounterOn] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getCurrentTimeObject = () => {
		const entries = new Map([
			['h', parseInt(hrs, 10)],
			['m', parseInt(mins, 10)],
			['s', parseInt(secs, 10)],
		]);
		const currentTimeObj = Object.fromEntries(entries);

		return currentTimeObj;
	};

	const currentTime = moment(getCurrentTimeObject());

	const thresholdTimeOne = moment({
		h: thresholdOneHrs,
		m: thresholdOneMins,
		s: thresholdOneSecs,
	});

	const thresholdTimeTwo = moment({
		h: thresholdTwoHrs,
		m: thresholdTwoMins,
		s: thresholdTwoSecs,
	});

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

	const handleThresholdOneHoursChange = (e) => {
		console.log(hrs, e.value);
		setThresholdOneTime([e.value, thresholdOneMins, thresholdOneSecs]);
	};
	const handleThresholdOneMinutesChange = (e) => {
		setThresholdOneTime([thresholdOneHrs, e.value, thresholdOneSecs]);
	};
	const handleThresholdOneSecondsChange = (e) => {
		setThresholdOneTime([thresholdOneHrs, thresholdOneMins, e.value]);
	};
	const handleThresholdTwoHoursChange = (e) => {
		setThresholdTwoTime([e.value, thresholdTwoMins, thresholdTwoSecs]);
	};
	const handleThresholdTwoMinutesChange = (e) => {
		setThresholdTwoTime([thresholdTwoHrs, e.value, thresholdTwoSecs]);
	};
	const handleThresholdTwoSecondsChange = (e) => {
		setThresholdTwoTime([thresholdTwoHrs, thresholdTwoMins, e.value]);
	};

	const startCounter = useCallback(() => {
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
		setThresholdOneTime([0, 0, 0]);
		setThresholdTwoTime([0, 0, 0]);
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
		if (counterOn && secs > 0) {
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
				thresholdOneHrs={thresholdOneHrs}
				thresholdOneMins={thresholdOneMins}
				thresholdOneSecs={thresholdOneSecs}
				thresholdTwoHrs={thresholdTwoHrs}
				thresholdTwoMins={thresholdTwoMins}
				thresholdTwoSecs={thresholdTwoSecs}
				onHoursChange={handleHoursChange}
				onMinutesChange={handleMinutesChange}
				onSecondsChange={handleSecondsChange}
				onThresholdOneHoursChange={handleThresholdOneHoursChange}
				onThresholdOneMinutesChange={handleThresholdOneMinutesChange}
				onThresholdOneSecondsChange={handleThresholdOneSecondsChange}
				onThresholdTwoHoursChange={handleThresholdTwoHoursChange}
				onThresholdTwoMinutesChange={handleThresholdTwoMinutesChange}
				onThresholdTwoSecondsChange={handleThresholdTwoSecondsChange}
			/>
		);
	};

	const renderIndicator = () => {
		if (hrs === 0 && mins === 0 && secs === 0) {
			return null;
		} else
			return (
				<TimerIndicator
					currentTime={currentTime}
					thresholdTimeOne={thresholdTimeOne}
					thresholdTimeTwo={thresholdTimeTwo}
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
			{console.log(hrs, mins, secs)}
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
			{counterOn ? renderIndicator() : null}
		</>
	);
};

export default Timer;
