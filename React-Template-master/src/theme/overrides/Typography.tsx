import { Components, Theme } from '@mui/material';
import { NEUTRAL } from '../palette';

export const TypographyStyle = (theme: Theme): Components => {
    return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    lineHeight: '28px',
                    letterSpacing: '0.3px',
                    color: NEUTRAL.default
                },

                h1: {
                    fontWeight: 700,
                    fontSize: '34px',
                    lineHeight: '64px',
                    letterSpacing: '0.25px',
                    color: NEUTRAL.darker
                },

                body2: {
                    height: '24px',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0.3px'
                },
                button: {
                    fontWeight: 700,
                    color: theme.palette.primary.light,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.5px'
                },

                h4: {
                    fontWeight: '700px',
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.1px',
                    textTransform: 'capitalize',
                    color: NEUTRAL.darker
                }
            }
        }
    };
};
