import { AuthError, AuthErrorCodes } from 'firebase/auth';

export const getError = (error: AuthError): string => {
    if (error.message === AuthErrorCodes.UNVERIFIED_EMAIL) {
        return 'emailNotVerified';
    }

    switch (error.code) {
        case AuthErrorCodes.USER_DELETED:
            return 'userNotFound';

        case AuthErrorCodes.EMAIL_EXISTS:
            return 'emailExists';

        case AuthErrorCodes.UNVERIFIED_EMAIL:
            return 'emailNotVerified';

        default:
            return 'invalidErrorCode';
    }
};
