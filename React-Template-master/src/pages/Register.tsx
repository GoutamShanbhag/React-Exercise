import React, { useEffect, useState } from 'react';
import { Button, TextField, Link, Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PasswordField } from '../components/PasswordField';

interface SignUpInputObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const checkForEmptyInputs = (data: SignUpInputObject): boolean => {
    const allValues = Object.values(data);
    for (const value of allValues) {
        if (value === '') return true;
    }
    return false;
};

export const Register = (): JSX.Element => {
    const { t } = useTranslation();

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    // signUpButtonDisabled is used to disable sing up button if input fields are empty.
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

    useEffect(() => {
        const state = checkForEmptyInputs(data);
        setSignUpButtonDisabled(state);
    }, [data]);

    const handleSubmit = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        //TODO: Register the user and add all the data into firestore
    };

    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography variant="h1">Sign up</Typography>
                <Typography
                    sx={{
                        mb: '40px'
                    }}>
                    Sign up with your email
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
                            fullWidth
                            label={t('FirstName')}
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
                            label={t('LastName')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={data.email}
                            onChange={(e): void => {
                                setData({ ...data, email: e.target.value });
                            }}
                            fullWidth
                            type="email"
                            label={t('Email')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField
                            label={t('Password')}
                            password={data.password}
                            setPassword={setPassword}
                        />
                    </Grid>
                </Grid>
                <Button
                    disabled={signUpButtonDisabled}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px'
                    }}>
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Typography variant="body2">
                            {'Already have an account? '}
                            <Link
                                variant="body2"
                                href="/login"
                                sx={{ color: '#6A39F1', textDecoration: 'none' }}>
                                Sign In
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
