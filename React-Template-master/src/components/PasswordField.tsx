import { TextField, InputAdornment, IconButton, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { t } from 'i18next';

interface PasswordFieldProps {
    password: string;
    label: string;
    setPassword: Function;
    showHelperText?: boolean;
}

export const PasswordField = ({
    label,
    password,
    setPassword,
    showHelperText
}: PasswordFieldProps): JSX.Element => {
    const theme = useTheme();

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [iconVisibility, setIconVisibility] = useState(false);

    useEffect(() => {
        if (password.length === 0) setIconVisibility(false);
        else {
            setIconVisibility(true);
        }
    }, [password]);

    return (
        <TextField
            value={password}
            onChange={(e): void => {
                setPassword(e.target.value);
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {iconVisibility && (
                            <IconButton
                                onClick={(): void => setPasswordVisibility(!passwordVisibility)}>
                                {passwordVisibility ? (
                                    <VisibilityIcon
                                        sx={{
                                            color: theme.palette.primary.light
                                        }}
                                    />
                                ) : (
                                    <VisibilityOffIcon
                                        sx={{ color: theme.palette.primary.light }}
                                    />
                                )}
                            </IconButton>
                        )}
                    </InputAdornment>
                )
            }}
            fullWidth
            label={label}
            type={passwordVisibility ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            helperText={
                showHelperText && iconVisibility && password.length < 6 ? t('invalidPassword') : ''
            }
        />
    );
};
