import React from 'react';
import { Box, SxProps } from '@mui/material';
import AppLogo from '../assets/Lejit.svg';
// ----------------------------------------------------------------------

interface LogoProps {
    sx?: SxProps;
}

export function Logo(sx: LogoProps): JSX.Element {
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
}
