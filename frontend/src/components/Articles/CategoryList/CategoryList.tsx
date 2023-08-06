import './CategoryList.css'
import {useCallback, useEffect, useRef, useState} from "react";
import {Category} from "../Category/Category.tsx";
import {TrendingCategory} from "../../../types/Category.ts";
import {getInterestedCategories} from "../../../api/articlesServices.ts";

export const CategoryList = () => {
    const [categories, setCategories] = useState<TrendingCategory[]>([]);
    const rawCategories = useRef<TrendingCategory[]>([]);

    const filterArticles = useCallback((categories: TrendingCategory[]) => {
        const width = window.innerWidth;
        if (width >= 768 && width < 1024) {
            setCategories(categories.slice(0, 3));
        }
        else if (width >= 1024 && width < 1280) {
            setCategories(categories.slice(0, 6));
        }
        else if (width >= 1280) {
            setCategories(categories.slice(0, 9));
        }
        else{
            setCategories(categories.slice(0, 1));
        }

    }, []);

    useEffect(() => {
        filterArticles(rawCategories.current)
        addEventListener('resize', () => {
            filterArticles(rawCategories.current)
        });
        return () => {
            removeEventListener('resize', () => {
                filterArticles(rawCategories.current)
            });
        }
    }, [filterArticles]);

    useEffect(() => {
        getInterestedCategories().then(categories => {
            rawCategories.current = categories;
            filterArticles(categories);
        }).catch(err => console.log(err))
    }, [filterArticles]);

    return (
        <div className={'category-list'}>
            {
                categories.map(category => (<Category key={category.id} category={category}/>))
            }
        </div>
    );
};