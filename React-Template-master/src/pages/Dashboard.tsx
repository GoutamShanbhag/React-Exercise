import * as React from 'react';
import AppLogo from '../assets/Lejit.svg';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Avatar,
    Select
} from '@mui/material';

const languages = [
    { language: 'English', flag: `/english.png` },
    { language: 'French', flag: '/france.png' }
];

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Dashboard', 'Users', 'My Profile'];

export function Dashboard(props: Props): JSX.Element {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = (): void => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" sx={{ backgroundColor: '#FFFFFF', height: '100px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mr: '120px' }}>
                    <Box
                        component="img"
                        src={AppLogo}
                        sx={{
                            width: '64px',
                            height: '33.6px',
                            ml: '80px',
                            mt: '33px',
                            mb: '33.4px'
                        }}></Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#3E0EC3' }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                        <Tooltip title="Current User">
                            <IconButton>
                                <Avatar>RS</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Typography sx={{ ml: '8px' }}>Rohit Sharma</Typography>
                        <Box
                            sx={{
                                width: '0px',
                                height: '24px',
                                border: '1px solid #8E90A6'
                            }}
                        />
                        <Box>
                            <Select sx={{ ml: '24px' }}>
                                <Box
                                    component="img"
                                    src={process.env.PUBLIC_URL + '/english.png'}
                                    sx={{
                                        width: '64px',
                                        height: '33.6px',
                                        ml: '80px',
                                        mt: '33px',
                                        mb: '33.4px'
                                    }}
                                />

                                <Box
                                    component="img"
                                    src={process.env.PUBLIC_URL + '/france.png'}
                                    sx={{
                                        width: '64px',
                                        height: '33.6px',
                                        ml: '80px',
                                        mt: '33px',
                                        mb: '33.4px'
                                    }}
                                />
                            </Select>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav"></Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}
