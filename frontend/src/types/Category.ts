import {Article} from "./Article.ts";

export type Category = {
    id: number,
    title: string,
}

export type TrendingCategory = {
    id: number,
    title: string,
    articles: Article[]
}