import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { NEUTRAL, WHITE } from '../theme/palette';
import { CorrectLogo, WarningLogo } from './Logo';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    open: boolean;
    setOpen: Function;
    modalContent: {
        title: string;
        subtitle: string;
        type: string;
    };
}

const style = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '408px',
    borderRadius: '4px',
    height: '268px',
    bgcolor: WHITE.main,
    boxShadow: 24,
    p: '20px'
};

export const MessageModal = (props: ConfirmationModalProps): JSX.Element => {
    const { t } = useTranslation();
    const { open, setOpen, modalContent } = props;
    const isCorrect = modalContent.type === 'correct';
    return (
        <Box>
            <Modal
                open={open}
                onClose={(): void => {
                    setOpen(false);
                }}>
                <Box sx={style}>
                    {isCorrect ? <CorrectLogo /> : <WarningLogo />}
                    <Typography variant="subtitle1" sx={{ mt: '11.3px' }}>
                        {t(modalContent.title)}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: 'center', mt: '6px', width: '360px', height: '48px' }}>
                        {t(modalContent.subtitle)}
                    </Typography>
                    <Button
                        fullWidth
                        sx={{ mt: '24px' }}
                        variant={isCorrect ? 'contained' : 'outlined'}
                        onClick={(): void => setOpen(false)}>
                        {isCorrect ? t('okay') : t('tryAgain')}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};
