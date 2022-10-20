import { onAuthStateChanged, User } from 'firebase/auth';
import { Unsubscribe } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/config';
import { Box, CircularProgress } from '@mui/material';
import { getDataFromFireStore } from '../Firebase/FirebaseFunctions';

interface UserProviderProps {
    children?: React.ReactNode;
}

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

export const userContext = createContext<UserData | null>(null);

export const UserProvider: React.FunctionComponent<UserProviderProps> = ({
    children
}: UserProviderProps): JSX.Element => {
    const { t } = useTranslation();
    const [user, setUser] = useState<UserData | null>(null);
    const [loaded, setLoaded] = useState<boolean | false>(false);
    const [userSignedIn, setUserSignedIn] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const getUserData = async (uid: string): Promise<void> => {
        try {
            if (uid) {
                const data = await getDataFromFireStore(uid, t('somethingWentWrong'));
                if (data) {
                    const { email, firstName, lastName } = data;
                    setUser({ firstName, lastName, email });
                    setUserSignedIn(true);
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

    useEffect(() => {
        let unsubscribe: Unsubscribe | undefined;

        if (
            pathname !== '/auth/register' &&
            pathname !== '/auth/login' &&
            pathname !== '/auth/forgot-password'
        ) {
            try {
                unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                    setLoaded(false);
                    if (firebaseUser) {
                        if (!user) {
                            getUserData(firebaseUser.uid);
                        }
                    } else {
                        setUser(null);
                        navigate('/auth/login');
                    }
                    setLoaded(true);
                });
            } catch (e) {
                alert(e);
            }
        } else {
            setLoaded(true);
        }

        return unsubscribe;
    }, [pathname]);

    return loaded ? (
        <userContext.Provider value={user}>{children}</userContext.Provider>
    ) : (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100vw">
            <CircularProgress />
        </Box>
    );
};
