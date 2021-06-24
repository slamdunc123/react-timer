import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SettingsIcon from '@material-ui/icons/Settings';
import useModalStyles from './styles';
import CountdownSettings from './CountdownSettings';

const CountdownModal = ({ settings, onChange, onClearInputs }) => {
    const classes = useModalStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="twinkl-timer-modal-button" onClick={handleOpen}>
                <SettingsIcon /> Settings
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <CountdownSettings
                        settings={settings}
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={onClearInputs} className={classes.button}>
                        Clear
                    </Button>
                    <Button onClick={handleClose} className={classes.button}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CountdownModal;
