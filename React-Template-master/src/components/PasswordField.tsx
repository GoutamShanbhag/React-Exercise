import { TextField, InputAdornment, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordInput {
    password: string;
    setPassword: Function;
}

export const PasswordField = (props: PasswordInput): JSX.Element => {
    const { password, setPassword } = props;

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
                        <IconButton
                            onClick={(): void => setPasswordVisibility(!passwordVisibility)}>
                            {iconVisibility &&
                                (passwordVisibility ? (
                                    <VisibilityIcon
                                        sx={{
                                            color: '#6A39F1'
                                        }}
                                    />
                                ) : (
                                    <VisibilityOffIcon sx={{ color: '#6A39F1' }} />
                                ))}
                        </IconButton>
                    </InputAdornment>
                )
            }}
            fullWidth
            name="password"
            label="Password"
            type={passwordVisibility ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
        />
    );
};
