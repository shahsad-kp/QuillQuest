import './ArticleBody.css'
import {useEffect, useRef, useState} from "react";
import {Article} from "../../../types/Article.ts";
import {useSearchParams} from "react-router-dom";
import {Category} from "../../../types/Category.ts";
import {CategorySelector} from "../CategorySelector/CategorySelector.tsx";
import {getInterestedArticles, getInterestedCategories} from "../../../api/articlesServices.ts";

export const ArticleBody = () => {
    const nextPage = useRef<number | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [searchParams] = useSearchParams()
    const [interestedCategories, setInterestedCategories] = useState<Category[]>([]);
    const selectedCategory = useRef('All');

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
        getInterestedArticles(category, nextPage.current).then(response => {
            setArticles(response.results);
            nextPage.current = response.next;
            selectedCategory.current = category || 'All';
        });
    }, [searchParams]);

    return (<div className={'article-list-body'}>
            <div className={'article-list'}>
                <CategorySelector
                    categories={interestedCategories}
                />
            </div>
        </div>);
};