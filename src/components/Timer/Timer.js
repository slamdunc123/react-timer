import React, { useState } from 'react';
import Advert from './Advert';
import ThemeSelector from './ThemeSelector';
import Display from './Display';
import AppSelector from './TimerSelector';
import FullScreenSelector from './FullScreenSelector';
import TitleSelector from './TitleSelector';

const Timer = () => {
	const [timerType, setTimerType] = useState('stopwatch');
    const [title, setTitle] = useState('Title');

	const handleTimerTypeSelector = (e) => {
		setTimerType(e.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};
	return (
		<div className='twinkl-timer-app-container'>
			<Advert />
            <div className="twinkl-timer-title">{title}</div>
			<Display timerType={timerType} />
			<div className='twinkl-timer-options'>
				<FullScreenSelector />
				<AppSelector
					timerType={timerType}
					handleTimerTypeSelector={handleTimerTypeSelector}
				/>
				<ThemeSelector />
                <TitleSelector handleTitleChange={handleTitleChange}/>
			</div>
		</div>
	);
};

export default Timer;
