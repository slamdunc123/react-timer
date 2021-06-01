import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

const CountDownTimer = () => {
	const hoursMinSecs = { hours: 0, minutes: 0, seconds: 0 };
	const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);
	const [[thresholdOneHrs, thresholdOneMins, thresholdOneSecs], setThresholdOneTime] = useState([hours, minutes, seconds]);
	const [[thresholdTwoHrs, thresholdTwoMins, thresholdTwoSecs], setThresholdTwoTime] = useState([hours, minutes, seconds]);
	const [[startHrs, startMins, startSecs], setStartTime] = useState([
		hours,
		minutes,
		seconds,
	]);
	const [counterOn, setCounterOn] = useState(false);

	const getCurrentTimeObject = () => {
		const entries = new Map([
			['h', parseInt(hrs, 10)],
			['m', parseInt(mins, 10)],
			['s', parseInt(secs, 10)],
		]);
		const currentTime = Object.fromEntries(entries);

		return currentTime;
	};

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
        setThresholdOneTime([e.target.value, thresholdOneMins, thresholdOneSecs]);
    }
    const handleThresholdOneMinutesChange = (e) => {
        setThresholdOneTime([thresholdOneHrs, e.target.value, thresholdOneSecs]);
    }
    const handleThresholdOneSecondsChange = (e) => {
        setThresholdOneTime([thresholdOneHrs, thresholdOneMins, e.target.value]);
    }
    const handleThresholdTwoHoursChange = (e) => {
        setThresholdTwoTime([e.target.value, thresholdTwoMins, thresholdTwoSecs]);
    }
    const handleThresholdTwoMinutesChange = (e) => {
        setThresholdTwoTime([thresholdTwoHrs, e.target.value, thresholdTwoSecs]);
    }
    const handleThresholdTwoSecondsChange = (e) => {
        setThresholdTwoTime([thresholdTwoHrs, thresholdTwoMins, e.target.value]);
    }

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
			<>
				{button}
				<button onClick={() => resetCounter()} disabled={counterOn}>
					Reset
				</button>
			</>
		);
	};

    const getIndicatorColor = () => {
		const cTime = moment(getCurrentTimeObject());

		const tTime = moment({ h: thresholdOneHrs, m: thresholdOneMins, s: thresholdOneSecs });

		const tTime2 = moment({ h: thresholdTwoHrs, m: thresholdTwoMins, s: thresholdTwoSecs });

		let color;
		if (cTime > tTime) {
			color = 'green';
		} else if (cTime <= tTime && cTime > tTime2) {
			color = 'orange';
		} else color = 'red';

		return color;
	};


	useEffect(() => {
		let interval;

		if (counterOn) {
			interval = setInterval(() => runCounter(), 1000);
		}
		return () => clearInterval(interval);
	}, [counterOn, runCounter]);

	useEffect(() => {
		getIndicatorColor();
	}, []);

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
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdOneHrs}
						onChange={handleThresholdOneHoursChange}
					/>
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdTwoHrs}
						onChange={handleThresholdTwoHoursChange}
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
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdOneMins}
						onChange={handleThresholdOneMinutesChange}
					/>
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdTwoMins}
						onChange={handleThresholdTwoMinutesChange}
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
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdOneSecs}
						onChange={handleThresholdOneSecondsChange}
					/>
					<input
						type='number'
						min='0'
						max='59'
						value={thresholdTwoSecs}
						onChange={handleThresholdTwoSecondsChange}
					/>
				</div>
			</div>
			<div className='twinkl-counter-controls'>{renderControls()}</div>
			<div
				style={{
					width: '100px',
					height: '100px',
					backgroundColor: getIndicatorColor(),
				}}
			></div>
		</div>
	);
};

export default CountDownTimer;
