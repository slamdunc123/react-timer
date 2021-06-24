import React from 'react';
import TimerSelector from './TimerSelector';
import FullScreenSelector from './FullScreenSelector';
import TitleChanger from './TitleChanger';
import BackgroundColorPicker from './BackgroundColorPicker';
import TextColorPicker from './TextColorPicker';

const SettingsMenu = ({
    title,
    timerType,
    onTimerTypeChange,
    onTitleChange,
    onBackgroundColorChange,
    onTextColorChange,
    textColor,
    backgroundColor,
    onToggleMenuItem,
    activeMenuItemId,
    onClickAway
}) => {
   
    return (
        <div className="twinkl-timer-settings-container">
            <FullScreenSelector />
            <div className="twinkl-timer-settings-menu" >
                <TimerSelector
                    timerType={timerType}
                    onTimerTypeChange={onTimerTypeChange}
                    onToggle={() => onToggleMenuItem('timer-selector')}
                    open={activeMenuItemId === 'timer-selector'}
                    onClickAway={onClickAway}
                />
                <TitleChanger
                    onTitleChange={onTitleChange}
                    title={title}
                    onToggle={() => onToggleMenuItem('title-changer')}
                    open={activeMenuItemId === 'title-changer'}
                    onClickAway={onClickAway}
                />
                <BackgroundColorPicker
                    onChange={onBackgroundColorChange}
                    onToggle={() => onToggleMenuItem('background-color-picker')}
                    open={activeMenuItemId === 'background-color-picker'}
                    backgroundColor={backgroundColor}
                    onClickAway={onClickAway}
                />
                <TextColorPicker
                    onChange={onTextColorChange}
                    onToggle={() => onToggleMenuItem('text-color-picker')}
                    open={activeMenuItemId === 'text-color-picker'}
                    textColor={textColor}
                    onClickAway={onClickAway}
                />
            </div>
        </div>
    );
};

export default SettingsMenu;
