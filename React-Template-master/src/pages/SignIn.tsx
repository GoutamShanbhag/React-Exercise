import React, { useState, useContext } from 'react';
import { TextField, Link, Box, Grid, Typography, useTheme } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';
import { emailValidation } from '../components/EmailValidation';
import { MessageModal, ModalContent } from '../components/MessageModal';
import { auth } from '../components/Firebase';
import { AuthError, AuthErrorCodes, signInWithEmailAndPassword } from 'firebase/auth';
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

const MODAL_CONTENT: ModalContent = {
    title: 'signInFail',
    subtitle: 'signInFailSubtitle',
    type: 'warning',
    buttonText: 'tryAgain'
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
    const [{ isError, errorMessage }, setHelperText] = useState({
        isError: false,
        errorMessage: ''
    });
    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        setLoading(true);
        if (data.email && data.password) {
            const { email, password } = data;
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                if (!user.user.emailVerified) {
                    setHelperText({ isError: true, errorMessage: t('emailNotVerified') });
                    setLoading(false);
                } else {
                    if (user.user.uid) {
                        setLoading(false);
                        navigate('/dashboard');
                    }
                }
            } catch (e) {
                const error = e as AuthError;
                if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
                    setOpen(true);
                } else {
                    const errorCode = getError(error);
                    setHelperText({ isError: true, errorMessage: t(errorCode) });
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
                                setHelperText({
                                    isError: !(await emailValidation(e.target.value)),
                                    errorMessage: t('invalidEmail')
                                });
                            }}
                            id="email"
                            label={t('email')}
                            type="email"
                            autoFocus
                            error={isError}
                            helperText={isError && errorMessage}
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
                    disabled={isError || checkForEmptyInputs(data)}
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
            <MessageModal open={open} setOpen={setOpen} modalContent={MODAL_CONTENT} />
        </Box>
    );
};
