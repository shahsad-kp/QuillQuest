export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: Date | string,
    setupCompleted?: boolean,
}