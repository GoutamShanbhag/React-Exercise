import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ForgotPassword = (): JSX.Element => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">Reset Your Password</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    Enter your email below for the reset link.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{ mt: '40px' }}>
                    <TextField
                        value={email}
                        onChange={(e): void => {
                            setEmail(e.target.value);
                        }}
                        autoComplete="email"
                        fullWidth
                        type="email"
                        label={t('Email')}
                        autoFocus
                    />
                </Grid>
            </Grid>
            <Button
                disabled={email.length === 0}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: '40px',
                    mb: '16px'
                }}>
                Reset Password
            </Button>
        </Box>
    );
};
