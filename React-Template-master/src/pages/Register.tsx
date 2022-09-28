import AppLog from '../assets/Lejit.svg';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Button,
    TextField,
    Link,
    Box,
    Grid,
    Typography,
    InputAdornment,
    IconButton
} from '@mui/material';
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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password')
        });
    };

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const setPassword = (password: string): void => {
        setData({ ...data, password });
    };

    const [btnColor, setBtnColor] = useState('#EBEBF0');

    useEffect(() => {
        const color = checkForEmptyInputs(data) ? '#EBEBF0' : '#3E0EC3';
        setBtnColor(color);
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
                    Sign up
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
                            autoComplete="given-name"
                            name="firstName"
                            fullWidth
                            id="firstName"
                            label="First Name"
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
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={data.email}
                            onChange={(e): void => {
                                setData({ ...data, email: e.target.value });
                            }}
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordField password={data.password} setPassword={setPassword} />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: '40px',
                        mb: '16px',
                        boxShadow: 'none',
                        height: '48px',
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0.5px',
                        backgroundColor: `${btnColor} !important`
                    }}>
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid
                        item
                        sx={{
                            height: '24px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: '24px',
                            letterSpacing: '0.3px',
                            color: '#555770'
                        }}>
                        {'Already have an account?  '}
                        <Link
                            href="/login"
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
                            Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
