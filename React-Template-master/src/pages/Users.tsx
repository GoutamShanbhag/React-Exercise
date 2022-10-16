import { Box, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../components/Firebase';

export const Users = (): JSX.Element => {
    useEffect(() => {
        const getAllUsers = async (): Promise<void> => {
            try {
                const docRef = doc(db, 'users');
                const docSnap = await getDoc(docRef);
                console.log('hello');
                if (docSnap.exists()) {
                    console.log(docSnap);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getAllUsers();
    }, []);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: '140px',
                width: '90%',
                ml: '80px'
            }}>
            <Typography>Goutam</Typography>
        </Box>
    );
};
