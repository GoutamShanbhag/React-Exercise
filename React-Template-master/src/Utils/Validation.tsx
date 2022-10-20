import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email()
});

export const emailValidation = async (email: string): Promise<boolean> => {
    const result = await schema.isValid({
        email
    });
    return result;
};
