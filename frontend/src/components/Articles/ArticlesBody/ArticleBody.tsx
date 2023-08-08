import './ArticleBody.css'
import {useCallback, useEffect, useRef, useState} from "react";
import {Article} from "../../../types/Article.ts";
import {useSearchParams} from "react-router-dom";
import {Category} from "../../../types/Category.ts";
import {CategorySelector} from "../CategorySelector/CategorySelector.tsx";
import {getInterestedArticles, getInterestedCategories} from "../../../api/articlesServices.ts";
import {ArticleList} from "../ArticleList/ArticleList.tsx";
import {OpenedArticle} from "../OpenedArticle/OpenedArticle.tsx";

export const ArticleBody = () => {
    const nextPage = useRef<number | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchParams] = useSearchParams()
    const [interestedCategories, setInterestedCategories] = useState<Category[]>([]);
    const selectedCategory = useRef('All');
    const [openedArticle, setOpenedArticle] = useState<Article | null>(null);
    const [fetchRequired, setFetchRequired] = useState<boolean>(true);

    const infiniteScroll  = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            const category = searchParams.get('category');
            getInterestedArticles(category, nextPage.current).then(response => {
                setArticles(response.results);
                nextPage.current = response.next;
                selectedCategory.current = category || 'All';
                setFetchRequired(false)
            });
        }
    }, [searchParams])

    useEffect(() => {
        window.addEventListener('scroll', infiniteScroll );
        return () => {
            window.removeEventListener('scroll', infiniteScroll );
        };
    }, [infiniteScroll]);

    useEffect(() => {
        getInterestedCategories().then(setInterestedCategories);

    }, []);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            if (selectedCategory.current !== category) {
                nextPage.current = null;
            }
        }
        if (fetchRequired) {
            getInterestedArticles(category, nextPage.current).then(response => {
                setArticles(response.results);
                nextPage.current = response.next;
                selectedCategory.current = category || 'All';
                setFetchRequired(false)
            });
        }
    }, [fetchRequired, searchParams]);

    return (<div className={'article-body'}>
        <div className={'article-body-inner article-body-width'}>
            <CategorySelector
                categories={interestedCategories}
            />
            <ArticleList articles={articles} openArticle={setOpenedArticle}/>
        </div>
        {openedArticle && <OpenedArticle
            article={openedArticle}
            closeFunction={() => setOpenedArticle(null)}
            setFetchRequired={setFetchRequired}
        />}
    </div>);
};