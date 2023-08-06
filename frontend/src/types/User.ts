export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    dateOfBirth: Date | string,
    setupCompleted?: boolean,
}

export type Author = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
}