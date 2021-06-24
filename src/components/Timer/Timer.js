import React, { useState, useEffect } from 'react';
import TimerModal from './TimerModal';
import { convertHMStoSeconds, convertSecondsToHMS, padZero } from '../../utils';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';

const defaultSettings = {
    startHrs: 0,
    startMins: 0,
    startSecs: 0,
    thresholdOneHrs: 0,
    thresholdOneMins: 0,
    thresholdOneSecs: 0,
    thresholdTwoHrs: 0,
    thresholdTwoMins: 0,
    thresholdTwoSecs: 0,
};
const Timer = ({ onBackgroundColorChange }) => {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [settings, setSettings] = useState(defaultSettings);

    useEffect(() => {
        setTimeInSeconds(
            convertHMStoSeconds([
                settings.startHrs,
                settings.startMins,
                settings.startSecs,
            ])
        );
    }, [settings]);

    const [counterOn, setCounterOn] = useState(false);

    const resetCounter = () =>
        setTimeInSeconds(
            convertHMStoSeconds([
                settings.startHrs,
                settings.startMins,
                settings.startSecs,
            ])
        );

    const handleClearCounterInputs = () => {
        resetCounter();
        setSettings(defaultSettings);
    };

    const renderControls = () => {
        const startTimeInSecs = convertHMStoSeconds([
            settings.startHrs,
            settings.startMins,
            settings.startSecs,
        ]);
        let button;
        if (
            !counterOn &&
            (timeInSeconds === 0 || timeInSeconds === startTimeInSecs)
        ) {
            button = (
                <button
                    onClick={() => setCounterOn(true)}
                    disabled={timeInSeconds === 0}
                >
                    <PlayArrowIcon />
                </button>
            );
        } else if (!counterOn && timeInSeconds < startTimeInSecs) {
            button = (
                <button onClick={() => setCounterOn(true)}>
                    <PlayArrowIcon />
                </button>
            );
        } else {
            button = (
                <button onClick={() => setCounterOn(false)}>
                    <PauseIcon />
                </button>
            );
        }

        return (
            <div className="twinkl-counter-controls">
                {button}
                <button
                    onClick={() => resetCounter()}
                    disabled={
                        counterOn ||
                        (!counterOn && timeInSeconds === startTimeInSecs)
                    }
                >
                    <ReplayIcon />
                </button>
            </div>
        );
    };

    useEffect(() => {
        let interval;

        if (counterOn) {
            interval = setInterval(
                () => setTimeInSeconds((pre) => pre - 1),
                1000
            );
        }
        return () => clearInterval(interval);
    }, [counterOn]);

    useEffect(() => {
        if (timeInSeconds === 0) setCounterOn(false);
    }, [timeInSeconds]);

    useEffect(() => {
        const startTimeInSecs = convertHMStoSeconds([
            settings.startHrs,
            settings.startMins,
            settings.startSecs,
        ]);
        const thresholdTimeOneInSecs = convertHMStoSeconds([
            settings.thresholdOneHrs,
            settings.thresholdOneMins,
            settings.thresholdOneSecs,
        ]);
        const thresholdTimeTwoInSecs = convertHMStoSeconds([
            settings.thresholdTwoHrs,
            settings.thresholdTwoMins,
            settings.thresholdTwoSecs,
        ]);
        let color;
        if (
            (timeInSeconds < startTimeInSecs || counterOn) &&
            timeInSeconds > thresholdTimeOneInSecs
        ) {
            color = 'green';
        } else if (
            timeInSeconds <= thresholdTimeOneInSecs &&
            timeInSeconds > thresholdTimeTwoInSecs
        ) {
            color = 'orange';
        } else if (
            timeInSeconds <= thresholdTimeTwoInSecs &&
            startTimeInSecs > 0
        ) {
            color = 'red';
        } else color = null;

        onBackgroundColorChange(color);
    }, [timeInSeconds, counterOn, settings, onBackgroundColorChange]);

    let [hrs, mins, secs] = convertSecondsToHMS(timeInSeconds);

    return (
        <>
            <div className="twinkl-counter-display-container">
                <div className="twinkl-counter-display">
                    <div className="twinkl-counter-unit">
                        {padZero(hrs)}
                        <span>hrs</span>
                    </div>
                    <div className="twinkl-counter-unit">
                        {padZero(mins)}
                        <span>mins</span>
                    </div>
                    <div className="twinkl-counter-unit">
                        {padZero(secs)}
                        <span>secs</span>
                    </div>
                </div>
                {renderControls()}
            </div>

            {!counterOn ? (
                <TimerModal
                    settings={settings}
                    onChange={setSettings}
                    onClearInputs={handleClearCounterInputs}
                />
            ) : null}
        </>
    );
};

export default Timer;
