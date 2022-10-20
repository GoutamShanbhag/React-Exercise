import React, { useContext } from 'react';
import { PURPLE } from '../theme/palette';
import { IconButton, Avatar, Typography, SxProps } from '@mui/material';
import { getInitials } from './utils';

interface AvatarIconProps {
    firstName: string;
    lastName: string;
    sx?: SxProps;
    disabled?: boolean;
}

export const AvatarIcon = ({ firstName, lastName, sx, disabled }: AvatarIconProps): JSX.Element => {
    return (
        <IconButton disabled={disabled} sx={{ color: PURPLE.lighter, mr: '16px' }}>
            <Avatar
                sx={{
                    ...sx,
                    textAlign: 'center',
                    backgroundColor: PURPLE.lighter
                }}>
                <Typography
                    variant="h1"
                    sx={{
                        color: PURPLE.dark,
                        fontSize: '32px'
                    }}>
                    {getInitials(firstName, lastName)}
                </Typography>
            </Avatar>
        </IconButton>
    );
};
