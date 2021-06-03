import React, { useState } from 'react';
import Advert from './Advert';
import Stopwatch from './Stopwatch';
import Timer from './Timer';
import BasicTimer from './BasicTimer';
import SettingsMenu from './SettingsMenu';

const TimerContainer = () => {
	const [timerType, setTimerType] = useState('stopwatch');
	const [title, setTitle] = useState('Title');

	const handleTimerTypeSelector = (e) => {
		setTimerType(e.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const renderTimerType = () => {
		let timer;

		if (timerType === 'stopwatch') {
			timer = <Stopwatch />;
		} else if (timerType === 'basictimer') {
			timer = <BasicTimer timerType={timerType}/>;
		} else if (timerType === 'timer') {
			timer = <Timer timerType={timerType}/>;
		}

		return timer;
	};

	return (
		<div className='twinkl-timer-app-container'>
            <SettingsMenu 
            title={title}
            timerType={timerType}
            handleTimerTypeSelector={handleTimerTypeSelector}
            handleTitleChange={handleTitleChange}
            />
			<Advert />
			<div className='twinkl-timer-title'>{title}</div>
			{renderTimerType()}
		
		</div>
	);
};

export default TimerContainer;
