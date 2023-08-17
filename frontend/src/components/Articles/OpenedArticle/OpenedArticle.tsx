import {Article} from "../../../types/Article.ts";
import "./OpenedArticle.css";
import {FC, useCallback, useEffect, useState} from "react";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {deleteArticle as deleteArticleService, fetchArticle, likeArticle} from "../../../api/articlesServices.ts";
import {useSelector} from "react-redux";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";
import {MdOutlineDeleteOutline} from "react-icons/md";

type Props = {
    article: Article, 
    closeFunction: () => void,
    setFetchRequired: ((value: boolean) => void)| null;
}

export const OpenedArticle: FC<Props> = ({article, closeFunction, setFetchRequired}) => {
    const [fetchedArticle, setFetchedArticle] = useState(article);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = useSelector(state => state?.auth.user);
    const createdDate = new Date(article.dateCreated)
    const createdDateString = createdDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const readingTime = Math.ceil(article.content.split(' ').length / 200) + ' min read';

    const deleteArticle = useCallback(() => {
        window.confirm('Are you sure you want to delete this article?') && deleteArticleService(article.id).then(() => {
            if (setFetchRequired) setFetchRequired(true);
            closeFunction();
        })
    }, [article.id, closeFunction, setFetchRequired])

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

    const convertTextIntoHtml = (text: string) => {
        // convert new lines with <br>
        return text.split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
        })
    }

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
                >
                    <div
                        onClick={() => likeArticle(fetchedArticle.id).then(res => {
                            setFetchedArticle({...fetchedArticle, liked: res.liked})
                        })}
                    >
                        {fetchedArticle.liked ? <AiFillHeart className={'article-opened-icons'} style={{color: "#f33d3d"}}/> :
                            <AiOutlineHeart className={'article-opened-icons'} style={{color: "#464646"}}/>}
                    </div>
                    {fetchedArticle.author.id === user.id ? <>
                        <div>
                            <Link
                                to={`/articles/${fetchedArticle.id}/edit`}
                                state={{article: fetchedArticle}}
                            >
                                <FiEdit className={'article-opened-icons'} style={{color: "#464646"}}/>
                            </Link>
                        </div>
                        <div>
                            <div
                                onClick={deleteArticle}
                            >
                                <MdOutlineDeleteOutline className={'article-opened-icons'} style={{color: "#ff0000"}}/>
                            </div>
                        </div>
                    </> : <>
                        <div>
                            <button className={fetchedArticle.blocked ? 'unblock' : ''}>{
                                fetchedArticle.blocked ? 'Unblock' : 'Block'
                            }</button>
                        </div>
                    </>
                    }
                </div>
            </div>
            <div
                className={'article-opened-details'}
            >
                {`${fetchedArticle.author.firstName} ${fetchedArticle.author.lastName}`} • {createdDateString} • {readingTime} • {fetchedArticle.noOfLikes} likes {fetchedArticle.author.id === user.id ? ` • ${fetchedArticle.noOfBlocks} blocks` : ''}
            </div>
            {fetchedArticle.image && <img
                className={'article-opened-image'}
                src={fetchedArticle.image}
                alt={fetchedArticle.title}
            />}
            <p className={'article-opened-content'}>{
                convertTextIntoHtml(fetchedArticle.content).map(
                    paragraph => paragraph
                )
            }</p>
        </div>
    </section>);
};