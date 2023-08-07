import {Article} from "../../../types/Article.ts";
import "./OpenedArticle.css";
import {FC, useEffect, useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {fetchArticle, likeArticle} from "../../../api/articlesServices.ts";

type Props = {
    article: Article;
    closeFunction: () => void;
}

export const OpenedArticle: FC<Props> = ({article, closeFunction}) => {
    const [fetchedArticle, setFetchedArticle] = useState(article);

    const createdDate = new Date(article.dateCreated)
    const createdDateString = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const readingTime = Math.ceil(article.content.split(' ').length / 200) + ' min read';

    useEffect(() => {
        fetchArticle(article.id).then(setFetchedArticle)
    }, [article.id]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!event.target.closest('#article')) {
                closeFunction();
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeFunction]);

    return (<section
        className="article-opened"
    >
        <div
            className={"article-inner-opened article-opened-width"}
            id={'article'}
        >
            <div className={'article-opened-head'}>
                <h1 className={'article-opened-title'}>{fetchedArticle.title}</h1>
                <div
                    className={'article-opened-actions'}
                    onClick={() => likeArticle(fetchedArticle.id).then(res => {
                        setFetchedArticle({...fetchedArticle, liked: res.liked})
                    })}
                >
                    {fetchedArticle.liked ? <AiFillHeart className={'article-opened-icons'}/> :
                        <AiOutlineHeart className={'article-opened-icons'}/>}
                </div>
            </div>
            <div
                className={'article-opened-details'}>{fetchedArticle.author.firstName} ● {createdDateString} ● {readingTime}</div>
            {fetchedArticle.image && <img
                className={'article-opened-image'}
                src={fetchedArticle.image}
                alt={fetchedArticle.title}
            />}
            <div className={'article-opened-content'}>{fetchedArticle.content}</div>
        </div>
    </section>);
};