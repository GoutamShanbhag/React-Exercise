import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { emailValidation } from '../Utils/Validation';
import { AuthError } from 'firebase/auth';

import { getError } from '../components/ErrorHandling';
import { MessageModal } from '../components/MessageModal';
import { resetPasswordWithEmailLink } from '../Firebase/FirebaseFunctions';
import { NEUTRAL } from '../theme/palette';
import { PageTitle } from '../components/PageTitle';

export const ForgotPassword = (): JSX.Element => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (): Promise<void> => {
        setLoading(true);
        try {
            await resetPasswordWithEmailLink(email);
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
            <PageTitle title={t('resetPasswordTitle')} subtitle={t('forgotPasswordSubtitle')} />
            <Box>
                <Box sx={{ mt: '40px' }}>
                    <TextField
                        error={Boolean(error)}
                        value={email}
                        onChange={async (e): Promise<void> => {
                            setEmail(e.target.value);
                            const isValid = await emailValidation(e.target.value);
                            if (!isValid) {
                                setError(t('invalidEmail'));
                            } else {
                                setError('');
                            }
                        }}
                        sx={{ width: '360px' }}
                        autoComplete="email"
                        fullWidth
                        type="email"
                        label={t('email')}
                        id="email"
                        autoFocus
                        helperText={Boolean(error) && error}
                    />
                </Box>
            </Box>
            <LoadingButton
                onClick={onSubmit}
                loading={loading}
                disabled={Boolean(error) || email.length === 0}
                fullWidth
                variant="contained"
                sx={{
                    mt: '40px',
                    mb: '16px',
                    width: '360px'
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
