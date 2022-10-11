import React, { useState } from 'react';
import { Box, IconButton, Avatar, Typography, Button } from '@mui/material';
import { PURPLE } from '../theme/palette';
import { ChangePasswordModal } from '../components/ChangePasswordModal';
import { useTranslation } from 'react-i18next';

export const ChangePassword = (): JSX.Element => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    return (
        <div>
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
                            {/* TODO: Add User's initials */}
                            <Typography
                                variant="h1"
                                sx={{
                                    color: PURPLE.dark,
                                    fontSize: '32px'
                                }}>
                                RS
                            </Typography>
                        </Avatar>
                    </IconButton>
                    <Box>
                        {/* TODO : Add the user's name and email address */}
                        <Typography variant="h5">Rohit Sharma</Typography>
                        <Typography variant="body1">Rohit.sharma@email.com</Typography>
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
        </div>
    );
};
