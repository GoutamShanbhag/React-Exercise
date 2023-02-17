import React, { useState, useContext } from 'react';
import { Logo } from '../components/Logo';
import { useTranslation } from 'react-i18next';
import { changeLanguage, SupportedLanguage } from '../i18n/config';
import { NEUTRAL } from '../theme/palette';
import { userContext } from '../context/Context';
import { getName } from './utils';
import AppLogo from '../assets/Lejit.svg';
import france from '../france.png';
import english from '../english.png';
import arrowUp from '../VectorUp.png';

import {
    AppBar,
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    styled,
    MenuItem,
    useTheme,
    Menu,
    SxProps
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/config';
import { customTypography } from '../theme/overrides/Typography';
import { AvatarIcon } from './AvatarIcon';

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

const navbarTitles: { title: string; path: string; sx?: SxProps }[] = [
    { title: 'dashboard', path: '/dashboard' },
    { title: 'users', path: '/dashboard/users' },
    { title: 'myProfile', path: '/dashboard/my-profile' }
];
//------------------------------------------------------

export const Appbar = (): JSX.Element => {
    const { pathname } = useLocation();
    const [language, setLanguage] = useState('en');
    const user = useContext(userContext);
    const [activeItem, setActiveItem] = useState(pathname.toString());
    const { t } = useTranslation();
    const theme = useTheme();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openLanguageMenu, setOpenLanguage] = useState(false);
    const navigate = useNavigate();

    const allLanguages = languageItems.map((item): JSX.Element => {
        return (
            <MenuItem
                key={item.languageCode}
                onClick={(): void => {
                    setLanguage(item.languageCode);
                    changeLanguage(item.languageCode);
                    setOpenLanguage(false);
                }}
                sx={{
                    display: 'flex',
                    padding: '8px',
                    pr: '51px',
                    backgroundColor: `${theme.palette.common.white} !important`
                }}>
                <Box
                    component="img"
                    src={item.image}
                    sx={{
                        width: '32px',
                        height: '32px',
                        mr: '12px'
                    }}
                />
                <Typography
                    sx={{
                        ...customTypography.small2,
                        color:
                            item.languageCode === language
                                ? theme.palette.primary.dark
                                : NEUTRAL.default
                    }}>
                    {item.languageName}
                </Typography>
            </MenuItem>
        );
    });
    const navItems = navbarTitles.map((item): JSX.Element => {
        return (
            <Box key={item.title} sx={{ ...item.sx }}>
                <Link
                    onClick={(): void => {
                        setActiveItem(item.path);
                    }}
                    to={item.path}
                    style={{
                        textDecoration: 'none',
                        WebkitTextFillColor:
                            item.path === activeItem ? theme.palette.primary.dark : NEUTRAL.lighter
                    }}>
                    <NavButtons>{t(item.title)}</NavButtons>
                </Link>
            </Box>
        );
    });

    if (!user) {
        return <></>;
    }
    const { firstName, lastName } = user;
    const toggleMenu = (): void => {
        setOpenMenu(!openMenu);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                m: 'auto',
                justifyContent: 'space-between',
                width: '89%',
                height: '100px'
            }}>
            <Box
                onClick={(): void => {
                    setActiveItem('/dashboard');
                    navigate('/dashboard');
                }}
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Logo src={AppLogo} sx={{ width: '64px', height: '33.6px' }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    minWidth: '766px',
                    justifyContent: 'space-between',
                    gap: '120px'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '64px'
                    }}>
                    {navItems}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px'
                    }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarIcon
                            firstName={firstName}
                            id={'iconbutton'}
                            lastName={lastName}
                            disabled={false}
                            onClick={setOpenMenu}
                        />
                        <Menu
                            onClose={(): void => setOpenMenu(false)}
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
                        <Typography
                            sx={{
                                color: NEUTRAL.default,
                                ...customTypography.subtitle4,
                                height: '20px'
                            }}>
                            {getName(firstName, lastName)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '0px',
                            height: '24px',
                            border: `1px solid ${NEUTRAL.dark}`
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100px',
                            justifyContent: 'space-between'
                        }}>
                        <Box component="img" src={language === 'en' ? english : france} />
                        <Typography
                            variant="body2"
                            sx={{
                                color: NEUTRAL.default
                            }}>
                            {language === 'en' ? 'EN' : 'FR'}
                        </Typography>
                        <Box
                            id="arrow"
                            component="img"
                            src={arrowUp}
                            onClick={(): void => {
                                setOpenLanguage(true);
                            }}
                            sx={{
                                transform: `${openLanguageMenu ? 'rotate(0deg)' : 'rotate(180deg)'}`
                            }}
                        />
                        <Menu
                            onClose={(): void => {
                                setOpenLanguage(false);
                            }}
                            sx={{ mt: '20px' }}
                            anchorEl={document.getElementById('arrow')}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transitionDuration="auto"
                            open={openLanguageMenu}>
                            {allLanguages}
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
