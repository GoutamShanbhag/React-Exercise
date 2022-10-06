import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Box, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PasswordField } from '../components/PasswordField';
import { emailValidation } from '../components/EmailValidation';
import { NEUTRAL } from '../theme/palette';

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

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        //TODO: Register the user and add all the data into firestore
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">{t('signUp')}</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    {t('signUpSubtitle')}
                </Typography>
            </Box>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: '40px', width: '360px' }}>
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
                            error={!isValidEmail}
                            onChange={async (e): Promise<void> => {
                                setData({ ...data, email: e.target.value });
                                setIsValidEmail(await emailValidation(e.target.value));
                            }}
                            fullWidth
                            id="email"
                            type="email"
                            label={t('email')}
                            helperText={!isValidEmail && t('invalidEmail')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField
                            label={t('password')}
                            password={data.password}
                            setPassword={setPassword}
                        />
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
                    {t('signUp')}
                </Button>
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
        </Box>
    );
};
