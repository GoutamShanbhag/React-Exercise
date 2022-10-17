import React, { useState } from 'react';
import { Modal, Grid, Box, Typography, Button, styled } from '@mui/material';
import { NEUTRAL } from '../theme/palette';
import { useTranslation } from 'react-i18next';
import { PasswordField } from './PasswordField';
import { auth } from './Firebase';
import { AuthError, updatePassword } from 'firebase/auth';
import { MessageModal } from './MessageModal';

const BoxContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    border: 'none',
    borderRadius: '4px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '408px',
    height: '430px',
    boxShadow: '24px',
    padding: '23px',
    backgroundColor: theme.palette.common.white
}));

interface ChangePasswordModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChangePasswordModal = (props: ChangePasswordModalProps): JSX.Element => {
    const { open, setOpen } = props;
    const { t } = useTranslation();
    const [data, setData] = useState({ newPassword: '', confirmNewPassword: '' });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [helperText, setHelperText] = useState<string>('');

    const setNewPassword = (newPassword: string): void => {
        setData({ ...data, newPassword });
    };

    const setConfirmNewPassword = (confirmNewPassword: string): void => {
        setData({ ...data, confirmNewPassword });
        if (data.newPassword !== confirmNewPassword) setHelperText(t('passwordMissMatch'));
        else setHelperText('');
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            if (auth.currentUser) {
                const result = await updatePassword(auth.currentUser, data.confirmNewPassword);
                setShowConfirmation(true);
                setOpen(false);
            }
        } catch (e) {
            const error = e as AuthError;
            alert(error);
        } finally {
            setData({ newPassword: '', confirmNewPassword: '' });
        }
    };
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
                            mt: '6px',
                            boxSizing: 'content-box'
                        }}>
                        {t('changePasswordSubtitle')}
                    </Typography>

                    <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mt: '24px', ml: '24px' }}>
                            {t('requiredField')}
                        </Typography>
                        <Grid item xs={12} sm={12}>
                            <PasswordField
                                password={data.newPassword}
                                setPassword={setNewPassword}
                                label={t('newPassword')}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <PasswordField
                                helperText={helperText}
                                password={data.confirmNewPassword}
                                setPassword={setConfirmNewPassword}
                                label={t('confirmPassword')}
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                disabled={
                                    data.confirmNewPassword !== data.newPassword ||
                                    data.confirmNewPassword.length === 0 ||
                                    data.newPassword.length === 0
                                }
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}>
                                {t('changePassword')}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={(): void => {
                                    setData({ newPassword: '', confirmNewPassword: '' });
                                    setOpen(false);
                                }}>
                                {t('cancel')}
                            </Button>
                        </Grid>
                    </Grid>
                </BoxContainer>
            </Modal>
            <MessageModal
                open={showConfirmation}
                setOpen={setShowConfirmation}
                title={t('passwordChangedTitle')}
                subtitle={t('passwordChangedSubtitle')}
                type={t('success')}
                buttonText={t('okay')}
            />
        </Box>
    );
};
