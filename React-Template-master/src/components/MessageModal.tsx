import React, { useState } from 'react';
import { Modal, Box, Typography, Button, useTheme } from '@mui/material';
import { NEUTRAL } from '../theme/palette';
import { CorrectLogo, WarningLogo } from './Logo';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
    open: boolean;
    setOpen: Function;
    modalContent: {
        title: string;
        subtitle: string;
        type?: string;
        buttonText: string;
    };
}

const style = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '408px',
    borderRadius: '4px',
    height: '268px',
    boxShadow: 24,
    p: '20px',
    boxSizeing: 'content-box'
};

export const MessageModal = (props: ConfirmationModalProps): JSX.Element => {
    const { t } = useTranslation();
    const theme = useTheme();
    const { open, setOpen, modalContent } = props;
    const { type, title, subtitle, buttonText } = modalContent;
    const isCorrect = type === 'correct';
    return (
        <Box>
            <Modal
                open={open}
                onClose={(): void => {
                    setOpen(false);
                }}>
                <Box sx={{ ...style, bgcolor: theme.palette.common.white }}>
                    {type && (isCorrect ? <CorrectLogo /> : <WarningLogo />)}
                    <Typography variant="subtitle1" sx={{ mt: '11.3px' }}>
                        {t(title)}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            mt: '6px',
                            width: '360px',
                            height: '48px'
                        }}>
                        {t(subtitle)}
                    </Typography>
                    <Button
                        fullWidth
                        sx={{
                            mt: '24px',
                            position: 'absolute',
                            bottom: '20px',
                            width: '360px'
                        }}
                        variant={isCorrect ? 'contained' : 'outlined'}
                        onClick={(): void => setOpen(false)}>
                        {t(buttonText)}
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};
