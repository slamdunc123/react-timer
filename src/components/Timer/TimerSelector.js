import React from 'react'

const TimerSelector = ({timerApp, handleTimerAppSelector}) => {
    return (
        <div className='twinkl-timer-selector'>
				<select value={timerApp} onChange={handleTimerAppSelector}>
					<option value='stopwatch'>Stopwatch</option>
					<option value='countdown'>Countdown</option>
					<option value='timer'>Timer</option>
				</select>
			</div>
    )
}

export default TimerSelector
