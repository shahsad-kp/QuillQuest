import {Article as ArticleType} from "../../../types/Article.ts";
import {FC} from "react";
import './ArticleList.css';
import {Article} from "../Article/Article.tsx";

type Props = {
    articles: ArticleType[];
    openArticle: (article: ArticleType) => void;
}

export const ArticleList: FC<Props> = ({articles, openArticle}) => {
    return (
        <div
            className={'article-list article-list-grid'}
        >
            {articles.map((article, index) => (<Article
                key={index}
                article={article}
                openArticle={openArticle}
            />) )}
        </div>
    );
};