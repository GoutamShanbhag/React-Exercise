import React, { useState } from 'react';
import { TextField, Link, Box, Typography, useTheme } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';
import { emailValidation } from '../Utils/Validation';
import { MessageModal } from '../components/MessageModal';
import { logIn } from '../Firebase/FirebaseFunctions';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { customTypography } from '../theme/overrides/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getError } from '../components/ErrorHandling';
import { PageTitle } from '../components/PageTitle';

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
                const userData = await logIn(email, password);
                if (userData.user.emailVerified) {
                    setLoading(false);
                    navigate('/dashboard');
                } else {
                    throw new Error(AuthErrorCodes.UNVERIFIED_EMAIL);
                }
            } catch (e) {
                const authError = e as AuthError;

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
        <Box sx={{ justifyContent: 'center' }}>
            <PageTitle title={t('signIn')} subtitle={t('signInSubtitle')} />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: '40px' }}>
                <Box sx={{ width: '360px' }}>
                    <TextField
                        fullWidth
                        value={data.email}
                        onChange={async (e): Promise<void> => {
                            setData({ ...data, email: e.target.value });
                            const isValid = await emailValidation(e.target.value);
                            if (!isValid) {
                                setError(t('invalidEmail'));
                            } else {
                                setError('');
                            }
                        }}
                        sx={{ width: '360px' }}
                        id="email"
                        label={t('email')}
                        type="email"
                        autoFocus
                        error={Boolean(error)}
                        helperText={Boolean(error) && error}
                    />
                    <PasswordField
                        sx={{ width: '360px', mt: '16px' }}
                        label={t('password')}
                        password={data.password}
                        setPassword={setPassword}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', mt: '8px' }}>
                    <Link href="/auth/forgot-password" sx={{ textDecoration: 'none' }}>
                        <Typography variant="button" sx={{ color: theme.palette.primary.light }}>
                            {t('forgotPassword')}
                        </Typography>
                    </Link>
                </Box>
                <Box sx={{ width: '360px', p: 0, mt: '40px', textAlign: 'center' }}>
                    <LoadingButton
                        disabled={Boolean(error) || checkForEmptyInputs(data)}
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mb: '16px',
                            width: '360px'
                        }}>
                        {t('signIn')}
                    </LoadingButton>

                    <Box>
                        <Typography sx={{ color: NEUTRAL.default, ...customTypography.small2 }}>
                            {t('noAccount')}
                            <Link
                                variant="body2"
                                href="/auth/register"
                                sx={{
                                    color: theme.palette.primary.light,
                                    textDecoration: 'none',
                                    ...customTypography.small2
                                }}>
                                {t('signUp')}
                            </Link>
                        </Typography>
                    </Box>
                </Box>
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
