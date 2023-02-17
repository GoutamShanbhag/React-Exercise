import { Box, Typography } from '@mui/material';
import React from 'react';
import AppLogo from '../assets/Lejit.svg';
import { NEUTRAL } from '../theme/palette';

interface PageTitleProps {
    title: string;
    subtitle: string;
}

export const PageTitle = ({ title, subtitle }: PageTitleProps): JSX.Element => {
    return (
        <Box>
            <Box component="img" src={AppLogo} />
            <Box sx={{ mt: '43.4px' }}>
                <Typography variant="h4">{title}</Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: '40px',
                        color: NEUTRAL.default
                    }}>
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};
