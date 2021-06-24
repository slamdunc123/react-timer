import './App.css';
import React, { useState } from 'react';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import Countdown from './components/Countdown';
import SettingsMenu from './components/SettingsMenu';

const App = () => {
    const [timerType, setTimerType] = useState('stopwatch');
    const [title, setTitle] = useState('Stopwatch');
    const [backgroundColor, setBackgroundColor] = useState('#2299f9');
    const [enhancedTimerBackgroundColor, setEnhancedTimerBackgroundColor] =
        useState();
    const [textColor, setTextColor] = useState('#ffffff');
    const [activeMenuItemId, setActiveMenuItemId] = useState();

    const handleToggleMenuItem = (id) => {
        if (activeMenuItemId === id) setActiveMenuItemId(null);
        else setActiveMenuItemId(id);
    };

    const capitaliseTitle = (value) => {
        const newTitle = value[0].toUpperCase() + value.substring(1);
        return newTitle;
    };

    const handleTimerTypeChange = (e) => {
        setTimerType(e.target.value);
        if (e.target.value === 'timer') {
            setTitle(`Enhanced ${capitaliseTitle(e.target.value)}`);
        } else setTitle(capitaliseTitle(e.target.value));
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleBackgroundColorChange = ({ hex }) => {
        setBackgroundColor(hex);
    };

    const handleTextColorChange = ({ hex }) => {
        setTextColor(hex);
    };

    const handleClickAway = () => {
        setActiveMenuItemId(null);
    };

    const renderTimerType = () => {
        let timer;

        if (timerType === 'stopwatch') {
            timer = <Stopwatch />;
        } else if (timerType === 'countdown') {
            timer = <Countdown timerType={timerType} />;
        } else if (timerType === 'timer') {
            timer = (
                <Timer
                    timerType={timerType}
                    onBackgroundColorChange={setEnhancedTimerBackgroundColor}
                />
            );
        }

        return timer;
    };

    return (
        <div
            className="twinkl-timer-app-container"
            style={{
                backgroundColor:
                    enhancedTimerBackgroundColor || backgroundColor,
                color: textColor,
            }}
        >
            <div className="twinkl-logo">
                <a
                    href="https://www.twinkl.co.uk/"
                    title="Return to home page"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        loading="lazy"
                        src="https://images.twinkl.co.uk/tr/raw/upload/t/images/icons/twinkl_logo_cropped_300px.png"
                        alt="Teaching Resources, Primary Resources, Twinkl, Primary School Resources"
                        id="logo"
                        className="twinkl-header-logo"
                        width="75"
                        height="48"
                    />
                </a>
            </div>

            <SettingsMenu
                title={title}
                timerType={timerType}
                onTimerTypeChange={handleTimerTypeChange}
                onTitleChange={handleTitleChange}
                onBackgroundColorChange={handleBackgroundColorChange}
                onTextColorChange={handleTextColorChange}
                textColor={textColor}
                backgroundColor={backgroundColor}
                onToggleMenuItem={handleToggleMenuItem}
                activeMenuItemId={activeMenuItemId}
                onClickAway={handleClickAway}
            />

            <div className="twinkl-timer-app-body">
                <div className="twinkl-timer-title">
                    <input
                        type="text"
                        onChange={handleTitleChange}
                        value={title}
                        maxLength="20"
                        style={{
                            color: textColor,
                            backgroundColor:
                                enhancedTimerBackgroundColor || backgroundColor,
                        }}
                        spellCheck="false"
                    />
                </div>
                {renderTimerType()}
            </div>
        </div>
    );
};

export default App;
