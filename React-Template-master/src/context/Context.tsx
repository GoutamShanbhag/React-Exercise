import { onAuthStateChanged } from 'firebase/auth';
import { Unsubscribe } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, getDataFromFireStore } from '../components/Firebase';
import { Box, CircularProgress } from '@mui/material';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface UserProviderProps {
    children?: React.ReactNode;
}

export const userContext = createContext<User>({ firstName: '', lastName: '', email: '' });

export const UserProvider: React.FunctionComponent<UserProviderProps> = ({
    children
}: UserProviderProps): JSX.Element => {
    const { t } = useTranslation();
    const [user, setUser] = useState<User>({ firstName: '', lastName: '', email: '' });
    const [uid, setUid] = useState<string | null>(null);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;

        if (
            pathname !== '/auth/register' &&
            pathname !== '/auth/login' &&
            pathname !== '/auth/forgot-password'
        ) {
            try {
                unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    if (firebaseUser) {
                        setUid(firebaseUser.uid);
                        setIsUserSignedIn(true);
                    } else {
                        navigate('/auth/login');
                    }
                });
            } catch (e) {
                alert(e);
            }
        }

        return unsubscribe;
    }, [pathname]);

    useEffect(() => {
        const getUserData = async (): Promise<void> => {
            try {
                if (uid) {
                    const data = await getDataFromFireStore(uid, t('somethingWentWrong'));
                    if (data) {
                        const { email, firstName, lastName } = data;
                        setUser({ firstName, lastName, email });
                        setLoaded(true);
                    } else {
                        alert(t('dataNotFound'));
                        navigate('/auth/login');
                    }
                }
            } catch (e) {
                alert(t('somethingWentWrong'));
            }
        };
        getUserData();
    }, [uid]);

    return loaded ? (
        <userContext.Provider value={user}>{children}</userContext.Provider>
    ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100vw">
            <CircularProgress />
        </Box>
    );
};
