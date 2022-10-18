import React, { useState, useContext } from 'react';
import { Box, IconButton, Avatar, Typography, Button } from '@mui/material';
import { PURPLE } from '../theme/palette';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { useTranslation } from 'react-i18next';
import { userContext } from '../context/Context';
import { getInitials, getName } from '../components/utils';

export const ChangePassword = (): JSX.Element => {
    const user = useContext(userContext);

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    if (!user) {
        return <></>;
    }
    const { firstName, lastName, email } = user;
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: '140px',
                    width: '90%',
                    ml: '80px'
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton disabled={true} sx={{ color: PURPLE.lighter, mr: '16px' }}>
                        <Avatar
                            sx={{
                                width: '100px',
                                height: '100px',
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
                    <Box>
                        <Typography variant="h5">{getName(firstName, lastName)}</Typography>
                        <Typography variant="h3">{email}</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button
                        onClick={(): void => setOpen(true)}
                        variant="contained"
                        sx={{ width: '308px', height: '48px' }}>
                        {t('changePassword')}
                    </Button>
                </Box>
            </Box>
            <ChangePasswordModal open={open} setOpen={setOpen} />
        </Box>
    );
};
