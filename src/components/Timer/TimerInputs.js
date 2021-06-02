import React from 'react';

const TimerInputs = ({
	hrs,
	mins,
	secs,
	thresholdOneHrs,
	thresholdOneMins,
	thresholdOneSecs,
	thresholdTwoHrs,
	thresholdTwoMins,
	thresholdTwoSecs,
	handleHoursChange,
	handleMinutesChange,
	handleSecondsChange,
	handleThresholdOneHoursChange,
	handleThresholdOneMinutesChange,
	handleThresholdOneSecondsChange,
	handleThresholdTwoHoursChange,
	handleThresholdTwoMinutesChange,
	handleThresholdTwoSecondsChange,
}) => {
	const calcThresholdOneMaxHrs = () => {
		let max = hrs;
		if ( mins === 0 && secs === 0) max = hrs - 1;
		return max;
	};
	const calcThresholdOneMaxMins = () => {
		let max = '59';
		if (hrs === thresholdOneHrs) max = mins;
		return max;
	};

	const calcThresholdOneMaxSecs = () => {
		let max = '59';
		if (mins === thresholdOneMins) max = secs - 1;
		return max;
	};

    const calcThresholdTwoMaxHrs = () => {
		let max = thresholdOneHrs;
		if (thresholdOneMins === 0 && thresholdOneSecs === 0) max = thresholdOneHrs - 1;
		return max;
	};

	const calcThresholdTwoMaxMins = () => {
		let max = '59';
		if (thresholdOneHrs === thresholdTwoHrs) max = thresholdOneMins;
		return max;
	};

	const calcThresholdTwoMaxSecs = () => {
		let max = '59';
		if (thresholdOneMins === thresholdTwoMins) max = thresholdOneSecs - 1;
		return max;
	};

	const calcThresholdOneHrsValue = () => {
		let value = thresholdOneHrs;
		if (thresholdOneHrs > hrs) value = 0;
		return value;
	};
	const calcThresholdTwoHrsValue = () => {
		let value = thresholdTwoHrs;
		if (thresholdTwoHrs > thresholdOneHrs) value = 0;
		return value;
	};

	return (
        <div className='twinkl-counter-input-container'>
			<div className='twinkl-counter-input-group-headings'>
               <span>hrs</span> 
               <span>mins</span> 
               <span>secs</span> 
            </div>
			<div className='twinkl-counter-input-group'>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max='23'
					value={hrs}
					onChange={handleHoursChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max='59'
					value={mins}
					onChange={handleMinutesChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max='59'
					value={secs}
					onChange={handleSecondsChange}
				/>
				Start time
			</div>
			<div className='twinkl-counter-input-group'>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdOneMaxHrs()}
					value={calcThresholdOneHrsValue()}
					onChange={handleThresholdOneHoursChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdOneMaxMins()}
					value={thresholdOneMins}
					onChange={handleThresholdOneMinutesChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdOneMaxSecs()}
					value={thresholdOneSecs}
					onChange={handleThresholdOneSecondsChange}
				/>
				1st Threshold
			</div>
			<div className='twinkl-counter-input-group'>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdTwoMaxHrs()}
					value={calcThresholdTwoHrsValue()}
					onChange={handleThresholdTwoHoursChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdTwoMaxMins()}
					value={thresholdTwoMins}
					onChange={handleThresholdTwoMinutesChange}
				/>
				<input
					className='twinkl-counter-input'
					type='number'
					min='0'
					max={calcThresholdTwoMaxSecs()}
					value={thresholdTwoSecs}
					onChange={handleThresholdTwoSecondsChange}
				/>
				2nd Threshold
			</div>
		</div>
	);
};

export default TimerInputs;
