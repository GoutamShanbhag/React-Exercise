import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { emailValidation } from '../components/EmailValidation';

export const ForgotPassword = (): JSX.Element => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);

    const onSubmit = (): void => {
        setLoading(true);
        //TODO: Add functionalities to change password
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">{t('resetPasswordTitle')}</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    {t('forgotPasswordSubtitle')}
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} sx={{ mt: '40px' }}>
                    <TextField
                        error={!isValidEmail}
                        value={email}
                        onChange={async (e): Promise<void> => {
                            setEmail(e.target.value);
                            setIsValidEmail(await emailValidation(e.target.value));
                        }}
                        autoComplete="email"
                        fullWidth
                        type="email"
                        label={t('email')}
                        id="email"
                        autoFocus
                        helperText={!isValidEmail && t('invalidEmail')}
                    />
                </Grid>
            </Grid>
            <LoadingButton
                onClick={onSubmit}
                loading={loading}
                disabled={email.length === 0}
                fullWidth
                variant="contained"
                sx={{
                    mt: '40px',
                    mb: '16px'
                }}>
                {t('resetPassword')}
            </LoadingButton>
        </Box>
    );
};
