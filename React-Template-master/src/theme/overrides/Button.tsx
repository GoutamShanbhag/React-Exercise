import { Components, Theme } from '@mui/material';
import { NEUTRAL } from '../palette';

export const ButtonStyle = (theme: Theme): Components => {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    fontFamily: 'Inter',
                    letterSpacing: '0.5px',
                    fontWeight: 700,
                    height: '48px',
                    '&:disabled': {
                        color: NEUTRAL.dark,
                        backgroundColor: NEUTRAL.light
                    }
                },
                contained: {
                    fontSize: '16px',
                    lineHeight: '24px',
                    backgroundColor: theme.palette.primary.dark
                },
                outlined: {
                    border: `1px solid ${theme.palette.primary.dark}`,
                    width: '360px',
                    color: theme.palette.primary.dark,
                    '&:hover': {
                        border: `1px solid ${theme.palette.primary.dark}`
                    }
                }
            }
        }
    };
};
