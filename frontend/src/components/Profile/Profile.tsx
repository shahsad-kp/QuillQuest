import './Profile.css'
import {User} from "../../types/User.ts";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {ArticleList} from "../Articles/ArticleList/ArticleList.tsx";
import {OpenedArticle} from "../Articles/OpenedArticle/OpenedArticle.tsx";
import {Article} from "../../types/Article.ts";
import {getOwnArticles} from "../../api/articlesServices.ts";

export const Profile = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user: User = useSelector(state => state?.auth.user)
    const [openedArticle, setOpenedArticle] = useState<Article | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const pageNumber = useRef<number | null>(null);


    const convertDateToString = useCallback((date: Date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }, []);

    useEffect(() => {
        getOwnArticles(pageNumber.current).then(res => {
            setArticles(res.results);
            pageNumber.current = res.next;
        });
    }, []);

    return (<div className={'article-body'}>
        <div className={'article-body-inner article-body-width'}>
            <div className={'profile'}>
                <div className={'profile-data'}>
                    <h3>{`${user.firstName} ${user.lastName}`}</h3>
                    <span>{user.email}</span>
                    <span>{user.phone}</span>
                    <span>{typeof user.dateOfBirth === 'string' ? user.dateOfBirth : convertDateToString(user.dateOfBirth)}</span>
                </div>
                <hr style={{width: '100%'}}/>
                <ArticleList
                    articles={articles}
                    openArticle={setOpenedArticle}
                />
            </div>
            {openedArticle && <OpenedArticle article={openedArticle} closeFunction={() => setOpenedArticle(null)}/>}
        </div>

    </div>);
};