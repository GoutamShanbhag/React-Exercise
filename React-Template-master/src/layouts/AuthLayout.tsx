import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Container, Box } from '@mui/material';
import image from '../Image.png';
import { Logo } from '../components/Logo';
import AppLogo from '../assets/Lejit.svg';

export const AuthLayout = (): JSX.Element => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={12} md={5}>
                <Container maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: '83px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            textAlign: 'left'
                        }}>
                        <Logo
                            sx={{
                                width: '64px',
                                height: '33.6px'
                            }}
                            src={AppLogo}
                        />
                        <Outlet />
                    </Box>
                </Container>
            </Grid>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
        </Grid>
    );
};
