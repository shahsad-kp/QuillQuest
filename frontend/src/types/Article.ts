import {Category} from "./Category.ts";
import {User} from "./User.ts";

export type Article = {
    id: number,
    title: string,
    content: string,
    image: string,
    category: Category,
    readingTime: number,
    dateCreated: Date | string,
    dateUpdated: Date | string,
    author: User
}