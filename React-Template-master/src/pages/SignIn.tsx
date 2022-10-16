import React, { useState } from 'react';
import { TextField, Link, Box, Grid, Typography, useTheme } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';
import { emailValidation } from '../components/EmailValidation';
import { MessageModal } from '../components/MessageModal';
import { logIn } from '../components/Firebase';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getError } from '../components/ErrorHandling';

interface SignInFormValues {
    email: string;
    password: string;
}

const checkForEmptyInputs = (data: SignInFormValues): boolean => {
    const allValues = Object.values(data);
    for (const value of allValues) {
        if (value === '') return true;
    }
    return false;
};

export const SignIn = (): JSX.Element => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        const { email, password } = data;
        if (email && password) {
            try {
                const user = await logIn(data);

                if (user.user.uid) {
                    setLoading(false);
                    navigate('/dashboard');
                }
            } catch (e) {
                const authError = e as AuthError;
                console.log(e);

                if (authError.code === AuthErrorCodes.INVALID_PASSWORD) {
                    setOpen(true);
                } else {
                    const errorCode = getError(authError);
                    setError(t(errorCode));
                }
                setLoading(false);
            }
        }
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">{t('signIn')}</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    {t('signInSubtitle')}
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '40px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            value={data.email}
                            onChange={async (e): Promise<void> => {
                                setData({ ...data, email: e.target.value });
                                if (!(await emailValidation(e.target.value))) {
                                    setError(t('invalidEmail'));
                                } else {
                                    setError('');
                                }
                            }}
                            id="email"
                            label={t('email')}
                            type="email"
                            autoFocus
                            error={Boolean(error)}
                            helperText={Boolean(error) && error}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <PasswordField
                            label={t('password')}
                            password={data.password}
                            setPassword={setPassword}
                        />
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Link
                            href="/auth/forgot-password"
                            variant="body2"
                            sx={{ textDecoration: 'none' }}>
                            <Typography variant="button">{t('forgotPassword')}</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <LoadingButton
                    disabled={Boolean(error) || checkForEmptyInputs(data)}
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px'
                    }}>
                    {t('signIn')}
                </LoadingButton>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2" sx={{ color: NEUTRAL.default }}>
                            {t('noAccount')}
                            <Link
                                variant="body2"
                                href="/auth/register"
                                sx={{
                                    color: theme.palette.primary.light,
                                    textDecoration: 'none'
                                }}>
                                {t('signUp')}
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <MessageModal
                open={open}
                setOpen={setOpen}
                title={t('signInFail')}
                subtitle={t('signInFailSubtitle')}
                type={t('error')}
                buttonText={t('tryAgain')}
            />
        </Box>
    );
};
