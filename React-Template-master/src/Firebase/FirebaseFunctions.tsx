import { setDoc, doc, getDoc, DocumentData } from 'firebase/firestore';
import { db, auth } from './config';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    UserCredential,
    updatePassword

} from 'firebase/auth';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const createNewUser = async (user: User): Promise<void> => {
    const { firstName, lastName, email, password } = user;
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, `users`, newUser.user.uid), {
        firstName,
        lastName,
        email
    });

    await sendEmailVerification(newUser.user);
};

export const logIn = async (email: string, password: string): Promise<UserCredential> => {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
};

export const getDataFromFireStore = async (
    uid: string,
    errorMessage: string
): Promise<DocumentData | null> => {
    if (uid) {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const result = docSnap.data();
            return result;
        } else {
            alert(errorMessage);
        }
    }

    return null;
};

export const updateUserPassword = async (password: string): Promise<void> => {
    if (auth.currentUser) {
        await updatePassword(auth.currentUser, password);
    }
};
