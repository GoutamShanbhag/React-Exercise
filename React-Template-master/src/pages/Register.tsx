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
import { customTypography } from '../theme/overrides/Typography';

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
        <Box sx={{ justifyContent: 'center' }}>
            <Box sx={{ height: '92px', mt: '43.4px' }}>
                <Typography variant="h4">{t('signUp')}</Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mb: '40px',
                        color: NEUTRAL.default
                    }}>
                    {t('signUpSubtitle')}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '360px', mt: '40px' }}>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={'16px'}
                    sx={{ width: '360px', height: '176px', mb: '40px', p: 0 }}>
                    <Grid
                        item
                        sx={{ display: 'flex', justifyContent: 'space-between', padding: '0px' }}>
                        <TextField
                            value={data.firstName}
                            onChange={(e): void => {
                                setData({ ...data, firstName: e.target.value });
                            }}
                            id="firstName"
                            sx={{ width: '172px', mr: '16px' }}
                            fullWidth
                            label={t('firstName')}
                            autoFocus
                        />
                        <TextField
                            value={data.lastName}
                            onChange={(e): void => {
                                setData({ ...data, lastName: e.target.value });
                            }}
                            fullWidth
                            sx={{ width: '172px' }}
                            id="lastName"
                            label={t('lastName')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: '360px' }}
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
                            sx={{ width: '360px' }}
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
                        mb: '16px',
                        width: '360px'
                    }}>
                    {t('signUp')}
                </LoadingButton>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography sx={{ color: NEUTRAL.default, ...customTypography.small2 }}>
                            {t('haveAnAccount')}
                            <Link
                                href="/auth/login"
                                sx={{
                                    color: theme.palette.primary.light,
                                    textDecoration: 'none',
                                    ...customTypography.small2
                                }}>
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
