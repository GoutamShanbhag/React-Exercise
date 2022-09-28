import { Components, Theme } from '@mui/material';
import { NEUTRAL } from '../palette';

export const InputBase = (theme: Theme): Components => {
    return {
        MuiInputBase: {
            styleOverrides: {
                input: {
                    borderRadius: '4px',
                    color: NEUTRAL.main,
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: 400,
                    letterSpacing: '0.3px'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: 500,
                    fontSize: theme.typography.pxToRem(14),
                    lineHeight: '150%',
                    color: NEUTRAL.dark,
                    '&.Mui-focused': {
                        // color: 'red'
                    }
                },
                shrink: {
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.pxToRem(12),
                    color: NEUTRAL.main
                }
            }
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: NEUTRAL.dark,
                        fontWeight: 400,
                        lineHeight: '24px',
                        letterSpacing: '0.3px'
                    },
                    '& label.Mui-focused': {
                        color: theme.palette.primary.light
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: NEUTRAL.light
                        },
                        '&:hover fieldset': {
                            borderColor: NEUTRAL.light
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.light
                        }
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // root: { backgroundColor: theme.palette.primary.main },
                notchedOutline: { border: '1px solid #000000' }
            }
        }
    };
};
