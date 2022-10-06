import React, { useState } from 'react';
import { Button, TextField, Link, Box, Grid, Typography, useTheme } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';
import { emailValidation } from '../components/EmailValidation';
import { MessageModal } from '../components/MessageModal';

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

const MODAL_CONTENT = {
    title: 'signInFail',
    subtitle: 'signInFailSubtitle',
    type: 'warning'
};

export const SignIn = (): JSX.Element => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [isValidEmail, setIsValidEmail] = useState(true);

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        //TODO: Add firebase function to sign in and direct the page to dashboard
        setOpen(true);

        return;
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
                                setIsValidEmail(await emailValidation(e.target.value));
                            }}
                            id="email"
                            label={t('email')}
                            type="email"
                            autoFocus
                            error={!isValidEmail}
                            helperText={!isValidEmail && t('invalidEmail')}
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
                <Button
                    disabled={!isValidEmail || checkForEmptyInputs(data)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px'
                    }}>
                    {t('signIn')}
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2" sx={{ color: NEUTRAL.default }}>
                            {t('noAccount')}
                            <Link
                                variant="body2"
                                href="/auth/register"
                                sx={{ color: theme.palette.primary.light, textDecoration: 'none' }}>
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
