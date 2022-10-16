export const getInitials = (firstName: string, lastName: string): string => {
    let initials = '';
    if (firstName.length >= 1) initials += firstName.charAt(0);
    if (lastName.length >= 1) initials += lastName.charAt(0);

    return initials;
};

export const getName = (firstName: string, lastName: string): string => {
    let name = '';
    if (firstName) name += firstName;
    if (lastName) name = name + ' ' + lastName;
    return name;
};
