import React from 'react';
import { MdTextFields } from 'react-icons/md';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const TitleChanger = ({
    onTitleChange,
    title,
    onToggle,
    open,
    onClickAway,
}) => {
    return (
        <div className="twinkl-timer-title-selector-container">
            <MdTextFields onClick={onToggle} />
            {open ? (
                <ClickAwayListener onClickAway={onClickAway}>
                    <input
                        type="text"
                        onChange={onTitleChange}
                        placeholder={'Title'}
                        value={title}
                        maxLength="20"
                        spellCheck="false"
                    />
                </ClickAwayListener>
            ) : null}
        </div>
    );
};

export default TitleChanger;
