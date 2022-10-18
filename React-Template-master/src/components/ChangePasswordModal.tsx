import React from 'react';
import { Modal, Grid, Box, TextField, Typography, Button, styled } from '@mui/material';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';

const BoxContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    border: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '408px',
    height: '430px',
    boxShadow: '24px',
    p: '20px',
    backgroundColor: theme.palette.common.white
}));

interface ChangePasswordModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
    const { open, setOpen } = props;
    const { t } = useTranslation();
    return (
        <Box>
            <Modal
                open={open}
                onClose={(): void => {
                    setOpen(false);
                }}>
                <BoxContainer>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: NEUTRAL.main
                        }}>
                        {t('changePasswordTitle')}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            mt: '6px'
                        }}>
                        {t('changePasswordSubtitle')}
                    </Typography>

                    <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mt: '24px', ml: '24px' }}>
                            {t('requiredField')}
                        </Typography>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth autoFocus required label={t('newPassword')} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField fullWidth required label={t('confirmPassword')} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button fullWidth variant="contained">
                                {t('changePassword')}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={(): void => setOpen(false)}>
                                {t('cancel')}
                            </Button>
                        </Grid>
                    </Grid>
                </BoxContainer>
            </Modal>
        </Box>
    );
};
