import React from 'react';
import Select from 'react-select';

const CountdownSettings = ({ settings, onChange }) => {
    const { startHrs, startMins, startSecs } = settings;

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

    const updateSetting = (fieldName, newValue) => {
        let newSettings = { ...settings, [fieldName]: newValue };
        if (onChange) {
            onChange(newSettings);
        }
    };

    return (
        <div className={`twinkl-counter-input-container countdown`}>
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
        </div>
    );
};

export default CountdownSettings;
