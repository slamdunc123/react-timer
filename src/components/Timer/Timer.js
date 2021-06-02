import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import TimerIndicator from './TimerIndicator';
import TimerModal from './TimerModal';
import TimerInputs from './TimerInputs';
import { GoSettings } from 'react-icons/go';
import { MdClose } from 'react-icons/md';

const Timer = () => {
	const hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
	const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
	const [
		[thresholdOneHrs, thresholdOneMins, thresholdOneSecs],
		setThresholdOneTime,
	] = useState([hours, minutes, seconds]);
	const [
		[thresholdTwoHrs, thresholdTwoMins, thresholdTwoSecs],
		setThresholdTwoTime,
	] = useState([hours, minutes, seconds]);
	const [[startHrs, startMins, startSecs], setStartTime] = useState([
		hours,
		minutes,
		seconds,
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

	const handleThresholdOneHoursChange = (e) => {
		setThresholdOneTime([
			e.target.value,
			thresholdOneMins,
			thresholdOneSecs,
		]);
	};
	const handleThresholdOneMinutesChange = (e) => {
		setThresholdOneTime([
			thresholdOneHrs,
			e.target.value,
			thresholdOneSecs,
		]);
	};
	const handleThresholdOneSecondsChange = (e) => {
		setThresholdOneTime([
			thresholdOneHrs,
			thresholdOneMins,
			e.target.value,
		]);
	};
	const handleThresholdTwoHoursChange = (e) => {
		setThresholdTwoTime([
			e.target.value,
			thresholdTwoMins,
			thresholdTwoSecs,
		]);
	};
	const handleThresholdTwoMinutesChange = (e) => {
		setThresholdTwoTime([
			thresholdTwoHrs,
			e.target.value,
			thresholdTwoSecs,
		]);
	};
	const handleThresholdTwoSecondsChange = (e) => {
		setThresholdTwoTime([
			thresholdTwoHrs,
			thresholdTwoMins,
			e.target.value,
		]);
	};

	const runCounter = useCallback(() => {
		if (hrs === 0 && mins === 0 && secs === 0) setCounterOn(false);
		else if (mins === 0 && secs === 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs === 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	}, [hrs, mins, secs]);

	const resetCounter = () =>
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
			<div className='twinkl-counter-controls'>
				{button}
				<button onClick={() => resetCounter()} disabled={counterOn}>
					Reset
				</button>
			</div>
		);
	};

	const renderCounterInputs = () => {
		if (counterOn) return;
		return (
			<TimerInputs
				hrs={hrs}
				mins={mins}
				secs={secs}
				thresholdOneHrs={thresholdOneHrs}
				thresholdOneMins={thresholdOneMins}
				thresholdOneSecs={thresholdOneSecs}
				thresholdTwoHrs={thresholdTwoHrs}
				thresholdTwoMins={thresholdTwoMins}
				thresholdTwoSecs={thresholdTwoSecs}
				handleHoursChange={handleHoursChange}
				handleMinutesChange={handleMinutesChange}
				handleSecondsChange={handleSecondsChange}
				handleThresholdOneHoursChange={handleThresholdOneHoursChange}
				handleThresholdOneMinutesChange={
					handleThresholdOneMinutesChange
				}
				handleThresholdOneSecondsChange={
					handleThresholdOneSecondsChange
				}
				handleThresholdTwoHoursChange={handleThresholdTwoHoursChange}
				handleThresholdTwoMinutesChange={
					handleThresholdTwoMinutesChange
				}
				handleThresholdTwoSecondsChange={
					handleThresholdTwoSecondsChange
				}
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
				style={{ color: 'white' }}
				onClick={() => setIsModalOpen(false)}
			>
				close
			</MdClose>
			{renderCounterInputs()}
		</>
	);

	useEffect(() => {
		let interval;

		if (counterOn) {
			interval = setInterval(() => runCounter(), 1000);
		}
		return () => clearInterval(interval);
	}, [counterOn, runCounter]);

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
			{counterOn ? renderIndicator() : null}
		</>
	);
};

export default Timer;
