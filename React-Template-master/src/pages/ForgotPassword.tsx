import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import React, { useState } from 'react';

export const ForgotPassword = (): JSX.Element => {
    const [email, setEmail] = useState('');

    return (
        <Box
            sx={{
                marginTop: '83px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                textAlign: 'left'
            }}>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography
                    component="h4"
                    variant="h1"
                    sx={{
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '34px',
                        lineHeight: '64px',
                        letterSpacing: '0.25px',
                        color: '#1C1C28'
                    }}>
                    Reset Your Password
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        fontStyle: 'normal',
                        lineHeight: '28px',
                        letterSpacing: '0.3px',
                        color: '#555770',
                        marginBottom: '40px'
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
                        id="email address"
                        label="Email address"
                        autoFocus
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mt: '40px',
                    mb: '16px',
                    height: '48px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    color: `${email.length === 0 ? '#8E90A6' : '#FFFFF'}`,
                    backgroundColor: `${email.length === 0 ? '#EBEBF0' : '#3E0EC3'} !important`
                }}>
                Reset Password
            </Button>
        </Box>
    );
};
