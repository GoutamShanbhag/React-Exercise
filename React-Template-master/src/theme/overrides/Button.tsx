import { Components, Theme } from '@mui/material';
import { NEUTRAL } from '../palette';

export const ButtonStyle = (theme: Theme): Components => {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&:disabled': {
                        color: NEUTRAL.dark,
                        backgroundColor: NEUTRAL.light
                    }
                },
                contained: {
                    boxShadow: 'none',
                    height: '48px',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    backgroundColor: theme.palette.primary.dark
                }
            }
        }
    };
};
