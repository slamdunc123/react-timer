import React from 'react';
import { SketchPicker } from 'react-color';
import { MdFormatColorText } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const TextColorPicker = ({ onChange, onToggle, open, textColor, onClickAway }) => {
    return (
        <div className="twinkl-timer-theme-colors-container">
            <MdFormatColorText onClick={onToggle} />
            {open ? (
                <ClickAwayListener onClickAway={onClickAway}>
                    <SketchPicker
                        className="twinkl-timer-theme-color-picker"
                        onChangeComplete={(color) => {
                            onChange(color);
                        }}
                        color={textColor}
                        disableAlpha
                    />
                </ClickAwayListener>
            ) : null}
        </div>
    );
};

export default TextColorPicker;
