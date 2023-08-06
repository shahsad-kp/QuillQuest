import {Article as ArticleType} from "../../../types/Article.ts";
import {FC} from "react";
import './ArticleList.css';
import {Article} from "../Article/Article.tsx";

type Props = {
    articles: ArticleType[];
}

export const ArticleList: FC<Props> = ({articles}) => {
    return (
        <div
            className={'article-list article-list-grid'}
        >
            {articles.map(article => (<Article article={article}/>) )}
        </div>
    );
};