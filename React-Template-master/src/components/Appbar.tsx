import React, { useState, useContext } from 'react';
import { Logo } from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { changeLanguage, SupportedLanguage } from '../i18n/config';
import { NEUTRAL, PURPLE } from '../theme/palette';
import { userContext } from '../context/Context';
import { getInitials, getName } from './utils';
import AppLogo from '../assets/Lejit.svg';
import france from '../france.png';
import english from '../english.png';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar,
    Select,
    styled,
    MenuItem,
    useTheme,
    Menu
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
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
    { title: 'dashboard', path: '/dashboard' },
    { title: 'users', path: '/dashboard/users' },
    { title: 'myProfile', path: '/dashboard/my-profile' }
];
//------------------------------------------------------

export const Appbar = (): JSX.Element => {
    const { pathname } = useLocation();
    const [language, setLanguage] = useState('en');
    const userData = useContext(userContext);
    const [activeItem, setActiveItem] = useState(pathname.toString());
    const { t } = useTranslation();
    const theme = useTheme();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const navigate = useNavigate();

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
            <Link
                onClick={(): void => setActiveItem(item.path)}
                key={item.title}
                to={item.path}
                style={{
                    textDecoration: 'none',
                    WebkitTextFillColor:
                        item.path === activeItem ? theme.palette.primary.dark : NEUTRAL.lighter
                }}>
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
                        component="div"
                        onClick={(): void => {
                            setActiveItem('/dashboard');
                            navigate('/dashboard');
                        }}
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
                            mr: '86px',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '60%',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box>
                                    <IconButton
                                        id="iconbutton"
                                        onClick={(): void => setOpenMenu(!openMenu)}
                                        sx={{ color: PURPLE.lighter }}>
                                        <Avatar
                                            sx={{
                                                width: '48px',
                                                height: '48px',
                                                backgroundColor: PURPLE.lighter
                                            }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: PURPLE.dark
                                                }}>
                                                {getInitials(userData.firstName, userData.lastName)}
                                            </Typography>
                                        </Avatar>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={document.getElementById('iconbutton')}
                                            open={openMenu}>
                                            <MenuItem
                                                onClick={(): void => {
                                                    signOut(auth);
                                                    setOpenMenu(false);
                                                }}>
                                                {t('signOut')}
                                            </MenuItem>
                                        </Menu>
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        alignContent: 'center',
                                        width: 'auto'
                                    }}>
                                    <Typography variant="body2">
                                        {getName(userData.firstName, userData.lastName)}
                                    </Typography>
                                </Box>
                            </Box>
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

                            <Select variant="standard" disableUnderline>
                                {allLanguages}
                            </Select>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
