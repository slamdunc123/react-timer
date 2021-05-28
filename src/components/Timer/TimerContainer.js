import React, {useState} from 'react';
import Advert from './TimerAdvert';
import TimerThemeSelector from './TimerThemeSelector';
import TimerDisplay from './TimerDisplay';
import TimerAppSelector from './TimerAppSelector';

const TimerContainer = () => {
    const [timerApp, setTimerApp] = useState('stopwatch');


    const handleTimerAppSelector = (e) => {
		setTimerApp(e.target.value);
	};
	return (
		<div>
			<Advert />
			<TimerDisplay />
			<TimerAppSelector timerApp={timerApp} handleTimerAppSelector={handleTimerAppSelector}/>
			<TimerThemeSelector />
		</div>
	);
};

export default TimerContainer;
