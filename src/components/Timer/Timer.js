import React, { useState } from 'react';
import Advert from './Advert';
import ThemeSelector from './ThemeSelector';
import Stopwatch from './Stopwatch';
import TimerSelector from './TimerSelector';
import FullScreenSelector from './FullScreenSelector';
import TitleSelector from './TitleSelector';
import Countdown from './Countdown';

const Timer = () => {
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
            timer = <Stopwatch />
        } else if (timerType  === 'countdown') {
            timer = <Countdown />
        }

        return timer
        
    }


	return (
		<div className='twinkl-timer-app-container'>
			<Advert />
			<div className='twinkl-timer-title'>{title}</div>
			{renderTimerType()}
			<div className='twinkl-timer-options'>
				<FullScreenSelector />
				<TimerSelector
					timerType={timerType}
					handleTimerTypeSelector={handleTimerTypeSelector}
				/>
				<ThemeSelector />
				<TitleSelector handleTitleChange={handleTitleChange} />
			</div>
		</div>
	);
};

export default Timer;
