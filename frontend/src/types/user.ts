export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: Date | string,
    loggedIn?: boolean
}