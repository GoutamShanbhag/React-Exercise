import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { changeLanguage, SupportedLanguage } from '../i18n/config';
import { NEUTRAL, PURPLE } from '../theme/palette';
import AppLogo from '../assets/Lejit.svg';
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
const languageItems: {
    languageName: string;
    image: string;
    languageCode: SupportedLanguage;
}[] = [
    { languageName: 'English', image: english, languageCode: 'en' },
    { languageName: 'France', image: france, languageCode: 'fr' }
];

const navbarTitles: { title: string; path: string }[] = [
    { title: 'dashboard', path: '/dashboard/change-password' },
    { title: 'users', path: '/dashboard/users' },
    { title: 'myProfile', path: '/dashboard/my-profile' }
];
//------------------------------------------------------

export const Appbar = (): JSX.Element => {
    const [language, setLanguage] = useState('en');
    const { t } = useTranslation();
    const theme = useTheme();
    const allLanguages = languageItems.map((item): JSX.Element => {
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
    const navItems = navbarTitles.map((item): JSX.Element => {
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
                    backgroundColor: theme.palette.common.white,
                    width: '100%'
                }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            ml: '80px',
                            mt: '33px',
                            mb: '33.4px',
                            width: '30%'
                        }}>
                        <Logo
                            sx={{
                                width: '64px',
                                height: '33.6px'
                            }}
                            type={'app'}
                            src={AppLogo}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            minWidth: '400px'
                        }}>
                        {navItems}
                    </Box>

                    <Box
                        sx={{
                            width: '25%',
                            justifyContent: 'space-around',
                            mr: '86px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '40%',
                                alignItems: 'center'
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton sx={{ color: PURPLE.lighter }}>
                                    <Avatar
                                        sx={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: PURPLE.lighter
                                        }}>
                                        <Typography variant="body2" sx={{ color: PURPLE.dark }}>
                                            {/* TODO : Take data from firestore  */}
                                            RS
                                        </Typography>
                                    </Avatar>
                                </IconButton>

                                <Typography variant="body2">
                                    {/* TODO : Take data from firestore */}
                                    Rohit Sharma
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: '0px',
                                height: '24px',
                                border: `1px solid ${NEUTRAL.dark}`
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
                        <Select variant="standard" disableUnderline>
                            {allLanguages}
                        </Select>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
