import React from 'react';
import { SketchPicker } from 'react-color';
import { MdFormatColorFill } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const BackgroundColorPicker = ({
    onChange,
    onToggle,
    open,
    backgroundColor,
    onClickAway,
}) => {
    return (
        <div className="twinkl-timer-theme-colors-container">
            <MdFormatColorFill onClick={onToggle} />
            {open ? (
                <ClickAwayListener onClickAway={onClickAway}>
                    <SketchPicker
                        className="twinkl-timer-theme-color-picker"
                        style={{ marginTop: '10px !important' }}
                        onChangeComplete={(color) => {
                            onChange(color);
                        }}
                        color={backgroundColor}
                        disableAlpha
                    />
                </ClickAwayListener>
            ) : null}
        </div>
    );
};

export default BackgroundColorPicker;
