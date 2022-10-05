import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n/config';
import { NEUTRAL, PURPLE, WHITE } from '../theme/palette';
import france from '../france.png';
import english from '../english.png';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Tooltip,
    IconButton,
    Avatar,
    Select,
    styled,
    MenuItem,
    useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';

//-----------------------------------------------------

const NavButtons = styled(Button)(({ theme }) => ({
    height: '24px',
    fontSize: '16px',
    lineHeight: '24px',
    fontStyle: 'normal',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    color: theme.palette.primary.dark
}));

//------------------------------------------------------

export const Appbar = (): JSX.Element => {
    const [language, setLanguage] = useState('en');
    const { t } = useTranslation();
    const lanuageItems = [
        { languageName: 'English', image: english, languageCode: 'en' },
        { languageName: 'France', image: france, languageCode: 'fr' }
    ].map((item): JSX.Element => {
        return (
            <MenuItem
                key={item.languageCode}
                onClick={(): void => {
                    setLanguage(item.languageCode);
                    changeLanguage(item.languageCode);
                }}
                sx={{ display: 'flex', padding: '8px', pr: '51px' }}>
                <Box
                    component="img"
                    src={item.image}
                    sx={{
                        width: '32px',
                        height: '32px',
                        mr: '12px'
                    }}
                />
                <Typography variant="body2">{item.languageName}</Typography>
            </MenuItem>
        );
    });
    const navItems = [
        { title: 'dashboard', path: '/dashboard/change-password' },
        { title: 'users', path: '/dashboard/users' },
        { title: 'myProfile', path: '/dashboard/my-profile' }
    ].map((item): JSX.Element => {
        return (
            <Link key={item.title} to={item.path} style={{ textDecoration: 'none' }}>
                <NavButtons>{t(item.title)}</NavButtons>
            </Link>
        );
    });
    return (
        <Box>
            <AppBar
                component="nav"
                sx={{
                    display: 'flex',
                    backgroundColor: WHITE.main,
                    width: '100%'
                }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            ml: '80px',
                            mt: '33px',
                            mb: '33.4px'
                        }}>
                        <Logo
                            sx={{
                                width: '64px',
                                height: '33.6px'
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                minWidth: '400px',
                                mr: '10px'
                            }}>
                            {navItems}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            <Tooltip title="Current User">
                                <IconButton sx={{ color: PURPLE.lighter }}>
                                    <Avatar
                                        sx={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: PURPLE.lighter
                                        }}>
                                        <Typography variant="body2" sx={{ color: PURPLE.dark }}>
                                            RS
                                        </Typography>
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: 'nowrap',
                                    ml: '8px',
                                    mr: '24px'
                                }}>
                                Rohit Sharma
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '0px',
                                height: '24px',
                                border: `1px solid ${NEUTRAL.dark}`,
                                mr: '24px'
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component="img" src={language === 'en' ? english : france} />
                            <Typography
                                variant="body2"
                                sx={{
                                    color: NEUTRAL.default,
                                    ml: '12px'
                                }}>
                                {language === 'en' ? 'EN' : 'FR'}
                            </Typography>
                        </Box>
                        <Select
                            variant="standard"
                            disableUnderline
                            sx={{
                                ml: '24px',
                                mr: '88.25px'
                            }}>
                            {lanuageItems}
                        </Select>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
