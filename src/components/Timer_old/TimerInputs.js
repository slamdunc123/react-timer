import React from 'react';
import Select from 'react-select';

const TimerInputs = ({
	timerType,
	startHrs,
	startMins,
	startSecs,
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
		let max = startHrs;
		if (startMins === 0 && startSecs === 0) max = startHrs - 1;
		return max;
	};
	const calcThresholdOneMaxMins = () => {
		let max = '59';
		if (startHrs === thresholdOneHrs) max = startMins;
		return max;
	};

	const calcThresholdOneMaxSecs = () => {
		let max = '59';
		if (startMins === thresholdOneMins) max = startSecs - 1;
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
				<span>Hrs</span>
				<span>Mins</span>
				<span>Secs</span>
			</div>
			<div className='twinkl-counter-input-group'>
				<div className='twinkl-counter-input'>
					{console.log('startHrs', startHrs)}
					<Select
						options={buildOptions(0, 23)}
						onChange={onHoursChange}
						placeholder='0'
						maxMenuHeight={150}
						value={{ value: startHrs, label: `${startHrs}` }}
					/>
				</div>
				<div className='twinkl-counter-input'>
					<Select
						options={buildOptions(0, 59)}
						onChange={onMinutesChange}
						placeholder='0'
						maxMenuHeight={150}
						value={{ value: startMins, label: `${startMins}` }}
					/>
				</div>
				<div className='twinkl-counter-input'>
					<Select
						options={buildOptions(0, 59)}
						onChange={onSecondsChange}
						placeholder='0'
						maxMenuHeight={150}
						value={{ value: startSecs, label: `${startSecs}` }}
					/>
				</div>
				<span>Start time</span>
			</div>
			{timerType === 'timer' ? (
				<>
					<div className='twinkl-counter-input-group'>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdOneMaxHrs()
								)}
								onChange={onThresholdOneHoursChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdOneHrs,
									label: `${thresholdOneHrs}`,
								}}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdOneMaxMins()
								)}
								onChange={onThresholdOneMinutesChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdOneMins,
									label: `${thresholdOneMins}`,
								}}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdOneMaxSecs()
								)}
								onChange={onThresholdOneSecondsChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdOneSecs,
									label: `${thresholdOneSecs}`,
								}}
							/>
						</div>
						<span>1st Threshold</span>
					</div>
					<div className='twinkl-counter-input-group'>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdTwoMaxHrs()
								)}
								onChange={onThresholdTwoHoursChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdTwoHrs,
									label: `${thresholdTwoHrs}`,
								}}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdTwoMaxMins()
								)}
								onChange={onThresholdTwoMinutesChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdTwoMins,
									label: `${thresholdTwoMins}`,
								}}
							/>
						</div>
						<div className='twinkl-counter-input'>
							<Select
								options={buildOptions(
									0,
									calcThresholdTwoMaxSecs()
								)}
								onChange={onThresholdTwoSecondsChange}
								placeholder='0'
								maxMenuHeight={150}
								value={{
									value: thresholdTwoSecs,
									label: `${thresholdTwoSecs}`,
								}}
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
