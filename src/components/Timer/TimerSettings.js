import React from 'react';
import Select from 'react-select';
import { convertHMStoSeconds } from '../../utils';

const TimerSettings = ({ settings, onChange }) => {
    const {
        startHrs,
        startMins,
        startSecs,
        thresholdOneHrs,
        thresholdOneMins,
        thresholdOneSecs,
        thresholdTwoHrs,
        thresholdTwoMins,
        thresholdTwoSecs,
    } = settings;

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
        if (
            (startMins === 0 && startSecs === 0) ||
            (startMins <= thresholdOneMins && startSecs <= thresholdOneSecs)
        )
            max = startHrs - 1;
        return max;
    };
    const calcThresholdOneMaxMins = () => {
        let max = '59';
        if (startHrs === thresholdOneHrs) {
            if (startSecs <= thresholdOneSecs) {
                max = startMins - 1;
            } else max = startMins;
        }
        return max;
    };

    const calcThresholdOneMaxSecs = () => {
        let max = '59';
        if (startHrs === thresholdOneHrs && startMins === thresholdOneMins)
            max = startSecs - 1;
        return max;
    };

    const calcThresholdTwoMaxHrs = () => {
        let max = thresholdOneHrs;
        if (
            (thresholdOneMins === 0 && thresholdOneSecs === 0) ||
            (thresholdOneMins <= thresholdTwoMins &&
                thresholdOneSecs <= thresholdTwoSecs)
        )
            max = thresholdOneHrs - 1;
        return max;
    };

    const calcThresholdTwoMaxMins = () => {
        let max = '59';
        if (thresholdOneHrs === thresholdTwoHrs) {
            if (thresholdOneSecs <= thresholdTwoSecs) {
                max = thresholdOneMins - 1;
            } else max = thresholdOneMins;
        }
        return max;
    };

    const calcThresholdTwoMaxSecs = () => {
        let max = '59';
        if (
            thresholdOneHrs === thresholdTwoHrs &&
            thresholdOneMins === thresholdTwoMins
        )
            max = thresholdOneSecs - 1;
        return max;
    };

    const updateSetting = (fieldName, newValue) => {
        let newSettings = { ...settings, [fieldName]: newValue };

        const startTimeInSecs = convertHMStoSeconds([
            newSettings.startHrs,
            newSettings.startMins,
            newSettings.startSecs,
        ]);
        const thresholdOneTimeInSecs = convertHMStoSeconds([
            newSettings.thresholdOneHrs,
            newSettings.thresholdOneMins,
            newSettings.thresholdOneSecs,
        ]);
        const thresholdTwoTimeInSecs = convertHMStoSeconds([
            newSettings.thresholdTwoHrs,
            newSettings.thresholdTwoMins,
            newSettings.thresholdTwoSecs,
        ]);

        if (thresholdOneTimeInSecs >= startTimeInSecs) {
            newSettings.thresholdOneHrs = 0;
            newSettings.thresholdOneMins = 0;
            newSettings.thresholdOneSecs = 0;
            newSettings.thresholdTwoHrs = 0;
            newSettings.thresholdTwoMins = 0;
            newSettings.thresholdTwoSecs = 0;
        }
        if (thresholdTwoTimeInSecs >= thresholdOneTimeInSecs) {
            newSettings.thresholdTwoHrs = 0;
            newSettings.thresholdTwoMins = 0;
            newSettings.thresholdTwoSecs = 0;
        }
        if (onChange) {
            onChange(newSettings);
        }
    };

    return (
        <div className={`twinkl-counter-input-container timer`}>
            <div className="twinkl-counter-input-group-headings">
                <span>Hrs</span>
                <span>Mins</span>
                <span>Secs</span>
            </div>
            <div className="twinkl-counter-input-group">
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, 23)}
                        onChange={(option) =>
                            updateSetting('startHrs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{ value: startHrs, label: `${startHrs}` }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, 59)}
                        onChange={(option) =>
                            updateSetting('startMins', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{ value: startMins, label: `${startMins}` }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, 59)}
                        onChange={(option) =>
                            updateSetting('startSecs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{ value: startSecs, label: `${startSecs}` }}
                    />
                </div>
                <span>Start time</span>
            </div>
            <div className="twinkl-counter-input-group">
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdOneMaxHrs())}
                        onChange={(option) =>
                            updateSetting('thresholdOneHrs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdOneHrs,
                            label: `${thresholdOneHrs}`,
                        }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdOneMaxMins())}
                        onChange={(option) =>
                            updateSetting('thresholdOneMins', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdOneMins,
                            label: `${thresholdOneMins}`,
                        }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdOneMaxSecs())}
                        onChange={(option) =>
                            updateSetting('thresholdOneSecs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdOneSecs,
                            label: `${thresholdOneSecs}`,
                        }}
                    />
                </div>
                <span>1st Threshold</span>
            </div>
            <div className="twinkl-counter-input-group">
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdTwoMaxHrs())}
                        onChange={(option) =>
                            updateSetting('thresholdTwoHrs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdTwoHrs,
                            label: `${thresholdTwoHrs}`,
                        }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdTwoMaxMins())}
                        onChange={(option) =>
                            updateSetting('thresholdTwoMins', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdTwoMins,
                            label: `${thresholdTwoMins}`,
                        }}
                    />
                </div>
                <div className="twinkl-counter-input">
                    <Select
                        options={buildOptions(0, calcThresholdTwoMaxSecs())}
                        onChange={(option) =>
                            updateSetting('thresholdTwoSecs', option.value)
                        }
                        placeholder="0"
                        maxMenuHeight={150}
                        value={{
                            value: thresholdTwoSecs,
                            label: `${thresholdTwoSecs}`,
                        }}
                    />
                </div>
                <span>2nd Threshold</span>
            </div>
        </div>
    );
};

export default TimerSettings;
