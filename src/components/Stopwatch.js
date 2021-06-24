import React, { useState, useEffect } from 'react';
import { padZero } from '../utils';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import './styles.css';

const Stopwatch = () => {
    const [counter, setCounter] = useState(0);
    const [counterOn, setCounterOn] = useState(false);

    const calculateMinutes = () => {
        return padZero(Math.floor((counter / 60000) % 60));
    };
    const calculateSeconds = () => {
        return padZero(Math.floor((counter / 1000) % 60));
    };
    const calculateHundredthsOfSecond = () => {
        return padZero((counter / 10) % 100);
    };

    const renderControls = () => {
        let button;
        if (!counterOn && counter === 0) {
            button = <button onClick={() => setCounterOn(true)}><PlayArrowIcon /></button>;
        } else if (!counterOn && counter > 0) {
            button = <button onClick={() => setCounterOn(true)}><PlayArrowIcon /></button>;
        }
        if (counterOn) {
            button = <button onClick={() => setCounterOn(false)}><PauseIcon /></button>;
        }

        return (
            <>
                {button}
                <button
                    onClick={() => setCounter(0)}
                    disabled={counterOn || (!counterOn && counter === 0)}
                >
                    <ReplayIcon />
                </button>
            </>
        );
    };

    useEffect(() => {
        let interval;

        if (counterOn) {
            interval = setInterval(() => {
                setCounter((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [counterOn]);

    return (
        <div className="twinkl-counter-display-container">
            <div className="twinkl-counter-display">
                <div className="twinkl-counter-unit">
                    {calculateMinutes()}
                    <span>mins</span>
                </div>
                <div className="twinkl-counter-unit">
                    {calculateSeconds()}
                    <span>secs</span>
                </div>
                <div className="twinkl-counter-unit">
                    {calculateHundredthsOfSecond()}
                    <span>100th</span>
                </div>
            </div>

            <div className="twinkl-counter-controls">{renderControls()}</div>
        </div>
    );
};

export default Stopwatch;
