import React, {useState} from 'react'
import { MdTimer } from 'react-icons/md';

const TimerSelector = ({timerType, onTimerTypeChange}) => {

    const [showTimerSelector, setShowTimerSelector] = useState(false)
    return (
        <div className='twinkl-timer-selector-container'>
            <MdTimer onClick={() => setShowTimerSelector(!showTimerSelector)}/>
            {
                showTimerSelector ? (

				<select value={timerType} onChange={onTimerTypeChange}>
					<option value='stopwatch'>Stopwatch</option>
					<option value='basictimer'>Basic Timer</option>
					<option value='timer'>Timer</option>
				</select>
                ) : null
            }
			</div>
    )
}

export default TimerSelector
