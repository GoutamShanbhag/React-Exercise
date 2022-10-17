import { TextField, InputAdornment, IconButton, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { t } from 'i18next';

interface PasswordFieldProps {
    password: string;
    label: string;
    setPassword: Function;
    helperText?: string;
    required?: boolean;
}

const getHelperText = (helperText: string | undefined, password: string): string => {
    if (helperText) {
        if (password.length > 1 && password.length < 6) {
            return t('invalidPassword');
        } else if (password.length >= 6) {
            return helperText;
        }
    }
    return '';
};

export const PasswordField = ({
    label,
    required,
    password,
    setPassword,
    helperText
}: PasswordFieldProps): JSX.Element => {
    const theme = useTheme();

    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
    const [iconVisibility, setIconVisibility] = useState<boolean>(false);

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
            required={required}
            fullWidth
            label={label}
            error={Boolean(helperText) && password.length > 0}
            type={passwordVisibility ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            helperText={getHelperText(helperText, password)}
        />
    );
};
