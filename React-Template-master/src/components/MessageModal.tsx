import React, { useState } from 'react';
import { Modal, Box, Typography, Button, useTheme, styled, Paper } from '@mui/material';
import Success from '../assets/Correct.svg';
import Error from '../assets/Warning.svg';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';

export type SupportedModalType = 'success' | 'error';

interface MessageModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    subtitle: string;
    type?: SupportedModalType;
    buttonText: string;
}

const getIcon = (type: SupportedModalType): JSX.Element => {
    return (
        <Logo
            sx={{ width: '53.33px', height: '53.33px' }}
            src={type === 'success' ? Success : Error}
        />
    );
};

//--------------------------------------------
const BoxStyle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
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
    p: '20px',
    boxSizing: 'content-box'
}));

const Subtitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    mt: '6px',
    width: '360px',
    height: '48px'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    mt: '24px',
    position: 'absolute',
    bottom: '20px',
    width: '360px'
}));
//----------------------------------------------
export const MessageModal = ({
    open,
    setOpen,
    type,
    title,
    subtitle,
    buttonText
}: MessageModalProps): JSX.Element => {
    const theme = useTheme();
    const isCorrect = type === 'success';
    return (
        <Box>
            <Modal
                open={open}
                onClose={(): void => {
                    setOpen(false);
                }}>
                <BoxStyle>
                    <Box sx={{ mt: '25.33px' }}>{type && getIcon(type)}</Box>
                    <Typography variant="subtitle1" sx={{ mt: '11.3px' }}>
                        {title}
                    </Typography>
                    <Subtitle variant="body1">{subtitle}</Subtitle>
                    <SubmitButton
                        fullWidth
                        variant={isCorrect ? 'contained' : 'outlined'}
                        onClick={(): void => setOpen(false)}>
                        {buttonText}
                    </SubmitButton>
                </BoxStyle>
            </Modal>
        </Box>
    );
};
