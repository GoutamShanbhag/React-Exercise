import React, { useState } from 'react';
import { TextField, Link, Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PasswordField } from '../components/PasswordField';
import { emailValidation } from '../Utils/Validation';
import { NEUTRAL } from '../theme/palette';
import { MessageModal } from '../components/MessageModal';
import { AuthError } from 'firebase/auth';

import { createNewUser } from '../Firebase/FirebaseFunctions';
import LoadingButton from '@mui/lab/LoadingButton';
import { getError } from '../components/ErrorHandling';

interface SignUpFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const checkForEmptyInputs = (data: SignUpFormValues): boolean => {
    const allValues = Object.values(data);
    for (const value of allValues) {
        if (value === '') return true;
    }
    return false;
};

export const Register = (): JSX.Element => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [helperText, setHelperText] = useState<string>('');

    const setPassword = (password: string): void => {
        if (password.length >= 6) setHelperText('');
        else {
            setHelperText(t('invalidPassword'));
        }
        setData({ ...data, password });
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const { firstName, lastName, email, password } = data;
        if (email && password) {
            try {
                await createNewUser({ firstName, lastName, email, password });
                setOpen(true);
            } catch (e) {
                const authError = e as AuthError;
                const errorCode = getError(authError);
                setError(t(errorCode));
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">{t('signUp')}</Typography>
                <Typography
                    variant="h3"
                    sx={{
                        mb: '40px'
                    }}>
                    {t('signUpSubtitle')}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: '40px', width: '360px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={data.firstName}
                            onChange={(e): void => {
                                setData({ ...data, firstName: e.target.value });
                            }}
                            id="firstName"
                            fullWidth
                            label={t('firstName')}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={data.lastName}
                            onChange={(e): void => {
                                setData({ ...data, lastName: e.target.value });
                            }}
                            fullWidth
                            id="lastName"
                            label={t('lastName')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={data.email}
                            error={Boolean(error)}
                            onChange={async (e): Promise<void> => {
                                setData({ ...data, email: e.target.value });
                                const isValid = await emailValidation(e.target.value);
                                if (!isValid) {
                                    setError(t('invalidEmail'));
                                } else {
                                    setError('');
                                }
                            }}
                            fullWidth
                            id="email"
                            type="email"
                            label={t('email')}
                            helperText={Boolean(error) && error}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField
                            helperText={helperText}
                            label={t('password')}
                            password={data.password}
                            setPassword={setPassword}
                        />
                    </Grid>
                </Grid>
                <LoadingButton
                    loading={loading}
                    disabled={Boolean(error) || checkForEmptyInputs(data) || Boolean(helperText)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px'
                    }}>
                    {t('signUp')}
                </LoadingButton>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2" sx={{ color: NEUTRAL.default }}>
                            {t('haveAnAccount')}
                            <Link
                                variant="body2"
                                href="/auth/login"
                                sx={{ color: theme.palette.primary.light, textDecoration: 'none' }}>
                                {t('signIn')}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <MessageModal
                open={open}
                setOpen={setOpen}
                title={t('signUpSuccess')}
                subtitle={t('signUpSuccessSubtitle')}
                type={t('success')}
                buttonText={t('okay')}
            />
        </Box>
    );
};
