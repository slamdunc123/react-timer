import React from 'react'

const TimerAppSelector = ({timerApp, handleTimerAppSelector}) => {
    return (
        <div className='timer-selector'>
				<select value={timerApp} onChange={handleTimerAppSelector}>
					<option value='stopwatch'>Stopwatch</option>
					<option value='countdown'>Countdown</option>
					<option value='timer'>Timer</option>
				</select>
			</div>
    )
}

export default TimerAppSelector
