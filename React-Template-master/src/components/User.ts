export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

export class User implements UserData {
    firstName = '';

    lastName = '';

    email = '';

    password = '';

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
