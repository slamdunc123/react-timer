import React from 'react'

const TimerSelector = ({timerType, handleTimerTypeSelector}) => {
    return (
        <div className='twinkl-timer-selector'>
				<select value={timerType} onChange={handleTimerTypeSelector}>
					<option value='stopwatch'>Stopwatch</option>
					<option value='countdown'>Countdown</option>
					<option value='timer'>Timer</option>
				</select>
			</div>
    )
}

export default TimerSelector
