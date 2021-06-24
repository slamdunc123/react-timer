import React from 'react';
import { MdTimer } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const TimerSelector = ({ timerType, onTimerTypeChange, onToggle, open, onClickAway }) => {

    return (
        <div className="twinkl-timer-selector-container">
            <MdTimer onClick={onToggle} />
            {open ? (
                <ClickAwayListener onClickAway={onClickAway}>
                <select value={timerType} onChange={onTimerTypeChange}>
                    <option value="stopwatch">Stopwatch</option>
                    <option value="countdown">Countdown</option>
                    <option value="timer">Enhanced Timer</option>
                </select>
               </ClickAwayListener>
            ) : null}
        </div>
    );
};

export default TimerSelector;
