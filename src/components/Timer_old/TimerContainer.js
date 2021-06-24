import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import Countdown from './Countdown';
import SettingsMenu from './SettingsMenu';

const TimerContainer = () => {
	const [timerType, setTimerType] = useState('stopwatch');
	const [title, setTitle] = useState('Title');

	const handleTimerTypeChange = (e) => {
		setTimerType(e.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const renderTimerType = () => {
		let timer;

		if (timerType === 'stopwatch') {
			timer = <Stopwatch />;
		} else if (timerType === 'countdown') {
			timer = <Countdown timerType={timerType} />;
		} else if (timerType === 'timer') {
			timer = <Timer timerType={timerType} />;
		}

		return timer;
	};

	return (
		<div className='twinkl-timer-app-container'>
			<SettingsMenu
				title={title}
				timerType={timerType}
				onTimerTypeChange={handleTimerTypeChange}
				onTitleChange={handleTitleChange}
			/>
			<div className='twinkl-timer-title'>{title}</div>
			{renderTimerType()}
		</div>
	);
};

export default TimerContainer;
