import { initializeApp } from 'firebase/app';
import { setDoc, doc, getFirestore, getDoc, DocumentData } from 'firebase/firestore';
import {
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    UserCredential
} from 'firebase/auth';
import { User } from './User';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

interface UserSignIn {
    email: string;
    password: string;
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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

export const logIn = async ({ email, password }: UserSignIn): Promise<UserCredential> => {
    const user = await signInWithEmailAndPassword(auth, email, password);

    if (!user.user.emailVerified) {
        const error = new Error();

        throw new Error(AuthErrorCodes.UNVERIFIED_EMAIL);
    }

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
