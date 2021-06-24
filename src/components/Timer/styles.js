import { makeStyles } from '@material-ui/core/styles';

const useModalStyles = makeStyles(() => ({
    actions: {
        display: 'flex',
    },
    button: {
        backgroundColor: '#ffffff',
        color: '#2299f9',
        '&:hover': {
            backgroundColor: '#2299f9',
            color: '#ffffff',
        },
        '&:nth-child(1)': {
            marginRight: 'auto',
        },
    },
}));

export default useModalStyles;
