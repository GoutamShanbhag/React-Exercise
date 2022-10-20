import React from 'react';
import { Box, Typography } from '@mui/material';

export const MyProfile = (): JSX.Element => {
    return (
        <Box
            sx={{
                alignItems: 'center',
                mt: '140px',
                width: '90%',
                ml: '80px',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
            <Typography variant="h1">My Profile</Typography>
        </Box>
    );
};
