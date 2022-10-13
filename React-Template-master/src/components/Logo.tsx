import React from 'react';
import { Box, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type SupportedLogoType = 'app' | 'modal';

interface LogoProps {
    sx?: SxProps;
    type: SupportedLogoType;
    src: string;
}

enum AppDimension {
    width = '64px',
    height = '33.6px'
}

enum ModalDimension {
    width = '53.33px',
    height = '53.33px',
    top = '25.33px'
}

export const Logo = ({ sx, type, src }: LogoProps): JSX.Element => {
    return (
        <Box
            component="img"
            src={src}
            sx={{
                ...(type === 'app' ? AppDimension : ModalDimension)
            }}
        />
    );
};
