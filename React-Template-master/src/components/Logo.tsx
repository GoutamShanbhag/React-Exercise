import React from 'react';
import { Box, SxProps } from '@mui/material';
import AppLogo from '../assets/Lejit.svg';
import Correct from '../assets/Correct.svg';
import Warning from '../assets/Warning.svg';
// ----------------------------------------------------------------------

interface LogoProps {
    sx?: SxProps;
}

export const Logo = (sx: LogoProps): JSX.Element => {
    return (
        <Box
            component="img"
            src={AppLogo}
            sx={{
                width: '64px',
                height: '33.6px',
                ...sx
            }}
        />
    );
};

export const CorrectLogo = (): JSX.Element => {
    return (
        <Box
            component="img"
            src={Correct}
            sx={{
                width: '53.33px',
                height: '53.33px',
                top: '25.33px'
            }}
        />
    );
};

export const WarningLogo = (): JSX.Element => {
    return (
        <Box
            component="img"
            src={Warning}
            sx={{
                width: '53.33px',
                height: '53.33px',
                top: '25.33px'
            }}
        />
    );
};
