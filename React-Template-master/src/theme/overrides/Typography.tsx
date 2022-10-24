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
                    fontSize: '14px ',
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
                h3: {
                    fontWeight: 400,
                    fontSize: '16px !important',
                    lineHeight: '28px',
                    letterSpacing: '0.3px'
                },
                h4: {
                    fontWeight: 700,
                    fontSize: '34px !important',
                    lineHeight: '64px',
                    letterSpacing: '0.25px'
                },

                h5: {
                    fontWeight: 700,
                    height: '40px ',
                    fontSize: '24px !important',
                    lineHeight: '40px',
                    color: '#000000'
                },
                h6: {
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0.3px',
                    color: NEUTRAL.default
                },
                body1: {
                    fontSize: '14px !important',
                    lineHeight: '24px',
                    fontWeight: 400,
                    letterSpacing: '0.3px'
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

                subtitle1: {
                    width: '360px',
                    height: '32px',
                    fontWeight: 700,
                    fontSize: '22px !important',
                    lineHeight: '32px',
                    textAlign: 'center',
                    letterSpacing: '0.1px',
                    color: '#28293D'
                },
                subtitle2: {
                    fontWeight: 400,
                    fontSize: '14px !important',
                    lineHeight: '24px',
                    textAlign: 'center',
                    letterSpacing: '0.3px'
                }
            }
        }
    };
};

export const customTypography = {
    h7: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '24px'
    },

    subtitle3: {
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.1px',
        textTransform: 'capitalize'
    },

    subtitle4: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.1px',
        textTransform: 'capitalize'
    },

    subtitle5: {
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.1px',
        textTransform: 'capitalize'
    },

    body3: {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0.3px'
    },

    small1: {
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '28px',
        letterSpacing: '0.3px'
    },

    small2: {
        fontWeight: 700,
        fontSize: '14px !important',
        lineHeight: '24px',
        letterSpacing: '0.3px'
    },

    small3: {
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '20px',
        letterSpacing: '0.3px'
    },
    small4: {
        fontWeight: 700,
        fontSize: '10px',
        lineHeight: '16px',
        letterSpacing: '0.3px'
    },

    button2: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.5px',
        textTransform: 'capitalize'
    },

    button3: {
        fontWeight: 700,
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.5px',
        textTransform: 'capitalize'
    },

    caption2: {
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '12px',
        letterSpacing: '0.3px'
    },

    overline2: {
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '12px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase'
    }
};
