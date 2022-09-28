import React from 'react';
import { AppBar, Box, Hidden, IconButton, Toolbar, alpha, styled, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

// ----------------------------------------------------------------------

interface NavbarProps {
    onOpenSidebar: Function;
}

export function Navbar({ onOpenSidebar }: NavbarProps): React.ReactElement {
    return (
        <RootStyle>
            <ToolbarStyle>
                <Hidden lgUp>
                    <IconButton
                        onClick={(): void => onOpenSidebar()}
                        sx={{ mr: 1, color: 'text.primary' }}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Box sx={{ flexGrow: 1 }} />
                {/* <AccountPopover /> */}
            </ToolbarStyle>
        </RootStyle>
    );
}
