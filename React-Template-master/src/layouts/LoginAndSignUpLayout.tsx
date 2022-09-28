import * as React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Paper, Grid, Container, Box } from '@mui/material';
import AppLog from '../assets/Lejit.svg';

export const LoginAndSignUpLayout = (): JSX.Element => {
    // onSubmit function

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: '83px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            textAlign: 'left'
                        }}>
                        <Box
                            component="img"
                            src={AppLog}
                            sx={{
                                width: '64px',
                                height: '33.6px'
                            }}
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
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/Image.png'})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
        </Grid>
    );
};
