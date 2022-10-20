export const getInitials = (firstName: string | null, lastName: string | null): string => {
    let initials = '';
    if (firstName && lastName) {
        if (firstName.length >= 1) initials += firstName.charAt(0).toUpperCase();
        if (lastName.length >= 1) initials += lastName.charAt(0).toUpperCase();
    }
    return initials;
};

export const getName = (firstName: string, lastName: string): string => {
    let name = '';
    if (firstName) name += firstName;
    if (lastName) name = name + ' ' + lastName;
    return name;
};
