import React from 'react';
import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface LogoProps {
    sx?: SxProps;
    src: string;
}

export const Logo = ({ sx, src }: LogoProps): JSX.Element => {
    return (
        <Box
            component="img"
            src={src}
            sx={{
                ...sx
            }}
        />
    );
};
