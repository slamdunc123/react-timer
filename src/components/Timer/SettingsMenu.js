import React, {useState} from 'react';
import ThemeSelector from './ThemeSelector';
import TimerSelector from './TimerSelector';
import FullScreenSelector from './FullScreenSelector';
import TitleSelector from './TitleSelector';
import { MdSettings } from 'react-icons/md';


const SettingsMenu = ({title, timerType, handleTimerTypeSelector, handleTitleChange}) => {

    const [showSettingsMenu, setShowSettingsMenu] = useState(false)
	return (
		<div
		className="twinkl-timer-settings-container"
		>
        <FullScreenSelector />
                <MdSettings onClick={() => setShowSettingsMenu(!showSettingsMenu)}/>
                {
                    showSettingsMenu ? (

            	<div className='twinkl-timer-settings-menu'>
                <TitleSelector handleTitleChange={handleTitleChange} title={title}/>
				<TimerSelector
					timerType={timerType}
					handleTimerTypeSelector={handleTimerTypeSelector}
				/>
                <ThemeSelector />
			</div>
                    ) : null
                }
        </div>
	);
};

export default SettingsMenu;
