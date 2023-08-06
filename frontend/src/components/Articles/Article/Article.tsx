import {Article as ArticleType} from "../../../types/Article.ts";
import {FC} from "react";
import DefaultImage from '../../../assets/default-article-image.png';
import './Article.css'

type Props = {
    article: ArticleType;
    openArticle: (article: ArticleType) => void;
}

export const Article: FC<Props> = ({article, openArticle}) => {
    const createdDate = new Date(article.dateCreated)
    const createdDateString = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const readingTime = Math.ceil(article.content.split(' ').length / 200) + ' min read';
    return (<section
        className={'article'}
        onClick={() => {openArticle(article)}}
    >
        <div>
            <img src={article.image ? article.image : DefaultImage} alt={article.title}/>
        </div>
        <div className={'content-area'}>
            <span className={'article-details'}>{createdDateString} ● {readingTime}</span>
            <div className={'article-data'}>
                <h2>{article.title}</h2>
                <p>{article.content}</p>
            </div>
            <span className={'author-details'}>{article.author.firstName}</span>
        </div>
    </section>);
};