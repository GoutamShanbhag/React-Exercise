import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { emailValidation } from '../components/EmailValidation';
import { auth } from '../components/Firebase';
import { AuthError, sendPasswordResetEmail } from 'firebase/auth';
import { getError } from '../components/ErrorHandling';
import { MessageModal } from '../components/MessageModal';

export const ForgotPassword = (): JSX.Element => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (): Promise<void> => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            setOpen(true);
        } catch (e) {
            const authError = e as AuthError;
            const errorCode = getError(authError);
            setError(t(errorCode));
            setLoading(false);
        }
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
                        error={Boolean(error)}
                        value={email}
                        onChange={async (e): Promise<void> => {
                            setEmail(e.target.value);
                            if (!(await emailValidation(e.target.value))) {
                                setError(t('invalidEmail'));
                            } else {
                                setError('');
                            }
                        }}
                        autoComplete="email"
                        fullWidth
                        type="email"
                        label={t('email')}
                        id="email"
                        autoFocus
                        helperText={Boolean(error) && error}
                    />
                </Grid>
            </Grid>
            <LoadingButton
                onClick={onSubmit}
                loading={loading}
                disabled={Boolean(error) || email.length === 0}
                fullWidth
                variant="contained"
                sx={{
                    mt: '40px',
                    mb: '16px'
                }}>
                {t('resetPassword')}
            </LoadingButton>
            <MessageModal
                open={open}
                setOpen={setOpen}
                title={t('resetPasswordSuccessTitle')}
                subtitle={t('resetPasswordSuccessSubtitle')}
                buttonText={t('close')}
            />
        </Box>
    );
};
