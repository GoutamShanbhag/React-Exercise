import { TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PRIMARY } from '../theme/palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordFieldProps {
    password: string;
    label: string;
    setPassword: Function;
}

export const PasswordField = ({
    label,
    password,
    setPassword
}: PasswordFieldProps): JSX.Element => {
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
                                            color: PRIMARY.light
                                        }}
                                    />
                                ) : (
                                    <VisibilityOffIcon sx={{ color: PRIMARY.light }} />
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
        />
    );
};
