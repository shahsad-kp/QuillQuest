import {Category} from "./Category.ts";
import {Author} from "./User.ts";

export type Article = {
    id: number,
    title: string,
    content: string,
    image: string,
    category: Category,
    readingTime: number,
    dateCreated: string,
    dateUpdated: string,
    author: Author,
    liked: boolean,
    tags: string[]
}