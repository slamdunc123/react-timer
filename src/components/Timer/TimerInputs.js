import React from 'react';
import Select from 'react-select';

const TimerInputs = ({
	timerType,
	hrs,
	mins,
	secs,
	thresholdOneHrs,
	thresholdOneMins,
	thresholdOneSecs,
	thresholdTwoHrs,
	thresholdTwoMins,
	thresholdTwoSecs,
	onHoursChange,
	onMinutesChange,
	onSecondsChange,
	onThresholdOneHoursChange,
	onThresholdOneMinutesChange,
	onThresholdOneSecondsChange,
	onThresholdTwoHoursChange,
	onThresholdTwoMinutesChange,
	onThresholdTwoSecondsChange,
}) => {
	const buildOptions = (min, max) => {
		const options = [];
		for (let i = min; i <= max; i++) {
			options.push({
				value: i,
				label: `${i}`,
			});
		}
		return options;
	};

	const calcThresholdOneMaxHrs = () => {
		let max = hrs;
		if (mins === 0 && secs === 0) max = hrs - 1;
		return max;
	};
	const calcThresholdOneMaxMins = () => {
		let max = '59';
		if (hrs === thresholdOneHrs) max = mins -1;
		return max;
	};

	const calcThresholdOneMaxSecs = () => {
		let max = '59';
		if (mins === thresholdOneMins) max = secs - 1;
		return max;
	};

	const calcThresholdTwoMaxHrs = () => {
		let max = thresholdOneHrs;
		if (thresholdOneMins === 0 && thresholdOneSecs === 0)
			max = thresholdOneHrs - 1;
		return max;
	};

	const calcThresholdTwoMaxMins = () => {
		let max = '59';
		if (thresholdOneHrs === thresholdTwoHrs) max = thresholdOneMins - 1;
		return max;
	};

	const calcThresholdTwoMaxSecs = () => {
		let max = '59';
		if (thresholdOneMins === thresholdTwoMins) max = thresholdOneSecs - 1;
		return max;
	};

	return (
		<div
			className={`twinkl-counter-input-container ${
				timerType === 'timer' ? 'timer' : 'basic-timer'
			}`}
		>
			<div className='twinkl-counter-input-group-headings'>
				<span>hrs</span>
				<span>mins</span>
				<span>secs</span>
			</div>
			<div className='twinkl-counter-input-group'>
				<div className='twinkl-counter-input'>
					<Select
						options={buildOptions(0, 23)}
						onChange={onHoursChange}
						placeholder='0'
                        maxMenuHeight={150}
					/>
				</div>
				<div className='twinkl-counter-input'>
					<Select
						options={buildOptions(0, 59)}
						onChange={onMinutesChange}
						placeholder='0'
                        maxMenuHeight={150}
					/>
				</div>
				<div className='twinkl-counter-input'>
					<Select
						options={buildOptions(0, 59)}
						onChange={onSecondsChange}
						placeholder='0'
                        maxMenuHeight={150}
					/>
				</div>
				<span>Start time</span>
			</div>
			{timerType === 'timer' ? (
				<>
					<div className='twinkl-counter-input-group'>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdOneMaxHrs())}
								onChange={onThresholdOneHoursChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdOneMaxMins())}
								onChange={onThresholdOneMinutesChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdOneMaxSecs())}
								onChange={onThresholdOneSecondsChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<span>1st Threshold</span>
					</div>
					<div className='twinkl-counter-input-group'>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdTwoMaxHrs())}
								onChange={onThresholdTwoHoursChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdTwoMaxMins())}
								onChange={onThresholdTwoMinutesChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(0, calcThresholdTwoMaxSecs())}
								onChange={onThresholdTwoSecondsChange}
								placeholder='0'
                                maxMenuHeight={150}
							/>
						</div>
						<span>2nd Threshold</span>
					</div>
				</>
			) : null}
		</div>
	);
};

export default TimerInputs;
