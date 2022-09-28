import React, { useEffect, useState } from 'react';
import { Container, Button, TextField, Link, Box, Grid, Typography } from '@mui/material';
import { PasswordField } from '../components/PasswordField';

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
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [allDataFilled, setallDataFilled] = useState(false);

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    useEffect(() => {
        setallDataFilled(checkForEmptyInputs(data));
    }, [data]);
    return (
        <Box>
            <Box sx={{ height: '130px', mt: '77px' }}>
                <Typography
                    component="h4"
                    variant="h1"
                    sx={{
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '34px',
                        lineHeight: '64px',
                        letterSpacing: '0.25px',
                        color: '#1C1C28'
                    }}>
                    Sign In
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 400,
                        fontSize: '16px',
                        fontStyle: 'normal',
                        lineHeight: '28px',
                        letterSpacing: '0.3px',
                        color: '#555770',
                        marginBottom: '40px'
                    }}>
                    Sign in with your email
                </Typography>
            </Box>
            <Box component="form" noValidate sx={{ mt: '40px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            autoComplete="given-name"
                            fullWidth
                            value={data.email}
                            onChange={(e): void => setData({ ...data, email: e.target.value })}
                            id="Email"
                            label="Email address"
                            type="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <PasswordField password={data.password} setPassword={setPassword} />
                    </Grid>
                    <Grid item xs sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Link
                            href="/forgotpassword"
                            variant="body2"
                            sx={{ textDecoration: 'none' }}>
                            <Typography
                                variant="button"
                                sx={{
                                    fontWeight: 700,
                                    color: '#6A39F1',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    letterSpacing: '0.5px'
                                }}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px',
                        height: '48px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0.5px',
                        color: `${allDataFilled ? '#8E90A6' : '#FFFFF'}`,
                        backgroundColor: `${allDataFilled ? '#EBEBF0' : '#3E0EC3'} !important`
                    }}>
                    Sign In
                </Button>
                <Grid container justifyContent="center">
                    <Grid
                        item
                        sx={{
                            height: '24px',
                            width: '237px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '24px',
                            letterSpacing: '0.3px',
                            color: '#555770'
                        }}>
                        {"Don't have an account?  "}
                        <Link
                            href="/register"
                            variant="body2"
                            sx={{
                                height: '24px',
                                width: '237px',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '14px',
                                lineHeight: '24px',
                                letterSpacing: '0.3px',
                                color: '#6A39F1'
                            }}>
                            Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
