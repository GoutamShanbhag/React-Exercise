import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, Unsubscribe } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db, getDataFromFireStore } from '../components/Firebase';

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
                    } else {
                        alert(t('dataNotFound'));
                    }
                }
            } catch (e) {
                alert(t('somethingWentWrong'));
            }
        };
        getUserData();
    }, [uid]);

    return <userContext.Provider value={user}>{children}</userContext.Provider>;
};
