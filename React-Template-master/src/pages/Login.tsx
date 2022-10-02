import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Box, Grid, Typography } from '@mui/material';
import { PasswordField } from '../components/PasswordField';
import { PRIMARY } from '../theme/palette';
import { useTranslation } from 'react-i18next';

interface SignInInputObject {
    email: string;
    password: string;
}

const checkForEmptyInputs = (data: SignInInputObject): boolean => {
    const allValues = Object.values(data);
    for (const value of allValues) {
        if (value === '') return true;
    }
    return false;
};

export const Login = (): JSX.Element => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [signInButtonDisabled, setSignInButtonDisabled] = useState(true);

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    useEffect(() => {
        setSignInButtonDisabled(checkForEmptyInputs(data));
    }, [data]);

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        //TODO: Add firebase function to sign in and direct the page to dashboard
        return;
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">Sign In</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    Sign in with your email
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '40px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            fullWidth
                            value={data.email}
                            onChange={(e): void => setData({ ...data, email: e.target.value })}
                            id="Email"
                            label={t('Email')}
                            type="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <PasswordField
                            label={t('Password')}
                            password={data.password}
                            setPassword={setPassword}
                        />
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Link
                            href="/forgotpassword"
                            variant="body2"
                            sx={{ textDecoration: 'none' }}>
                            <Typography variant="button">Forgot password?</Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Button
                    disabled={signInButtonDisabled}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px'
                    }}>
                    Sign In
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2">
                            {"Don't have an account? "}
                            <Link
                                variant="body2"
                                href="/register"
                                sx={{ color: PRIMARY.light, textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
