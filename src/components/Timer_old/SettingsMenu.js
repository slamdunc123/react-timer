import React from 'react';
import ThemeSelector from './ThemeSelector';
import TimerSelector from './TimerSelector';
import FullScreenSelector from './FullScreenSelector';
import TitleSelector from './TitleSelector';

const SettingsMenu = ({
	title,
	timerType,
	onTimerTypeChange,
	onTitleChange,
}) => {
	return (
		<div className='twinkl-timer-settings-container'>
			<FullScreenSelector />
			<div className='twinkl-timer-settings-menu'>
				<TimerSelector
					timerType={timerType}
					onTimerTypeChange={onTimerTypeChange}
				/>
				<TitleSelector onTitleChange={onTitleChange} title={title} />
				<ThemeSelector />
			</div>
		</div>
	);
};

export default SettingsMenu;
