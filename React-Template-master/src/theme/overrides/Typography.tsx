import { Components, Theme } from '@mui/material';

export const TypographyStyle = (theme: Theme): Components => {
    return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontStyle: 'normal',
                    fontFamily: 'Inter',
                    color: theme.palette.common.black
                },

                h1: {
                    fontWeight: 700,
                    fontSize: '96px',
                    lineHeight: '120px',
                    letterSpacing: '-1.5px'
                },
                h2: {
                    fontWeight: 700,
                    fontSize: '60px',
                    lineHeight: '80px',
                    letterSpacing: '-0.5px'
                },
                h3: {
                    fontWeight: 700,
                    fontSize: '48px',
                    lineHeight: '72px'
                },
                h4: {
                    fontWeight: 700,
                    fontSize: '34px',
                    lineHeight: '64px',
                    letterSpacing: '0.25px'
                },

                h5: {
                    fontWeight: 700,
                    fontSize: '24px',
                    lineHeight: '40px'
                },
                h6: {
                    fontWeight: 700,
                    fontSize: '20px',
                    lineHeight: '32px'
                },
                body1: {
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '28px',
                    letterSpacing: '0.3px'
                },

                body2: {
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '24px',
                    letterSpacing: '0.3px'
                },
                button: {
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textTransform: 'capitalize'
                },

                subtitle1: {
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: '32px',
                    letterSpacing: '0.1px',
                    textTransform: 'capitalize'
                },
                subtitle2: {
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '32px',
                    letterSpacing: '0.1px',
                    textTransform: 'capitalize'
                },
                caption: {
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.3px'
                },
                overline: {
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                }
            }
        }
    };
};

export const cutomTypography = {
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
        fontSize: '14px',
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
