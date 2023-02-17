import React, { useContext } from 'react';
import { IconButton, Avatar, Typography, SxProps } from '@mui/material';
import { getInitials } from './utils';
import { customTypography } from '../theme/overrides/Typography';
import { PURPLE } from '../theme/palette';

interface AvatarIconProps {
    id?: string;
    firstName: string;
    lastName: string;
    sx?: SxProps;
    disabled?: boolean;
    textFontSize?: string;
    onClick?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AvatarIcon = ({
    firstName,
    lastName,
    sx,
    disabled,
    id,
    textFontSize,
    onClick
}: AvatarIconProps): JSX.Element => {
    return (
        <IconButton
            id={id}
            disabled={disabled}
            sx={{ color: PURPLE.lighter }}
            onClick={(): void => {
                if (onClick) {
                    onClick(true);
                }
            }}>
            <Avatar sx={{ ...sx, textAlign: 'center', backgroundColor: PURPLE.lighter }}>
                <Typography
                    sx={{
                        ...customTypography.subtitle4,
                        color: PURPLE.dark
                    }}>
                    {getInitials(firstName, lastName)}
                </Typography>
            </Avatar>
        </IconButton>
    );
};
