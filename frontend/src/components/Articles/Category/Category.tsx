import {TrendingCategory} from "../../../types/Category.ts";
import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import './Category.css'
import {Article} from "../../../types/Article.ts";

type Props = {
    category: TrendingCategory
}

export const Category: FC<Props> = ({category}) => {
    const gradient = useMemo(() => {
        const gradients = ["linear-gradient(to right, #1b7dd2, #004D99)", "linear-gradient(to bottom, #1b7dd2, #004D99)", "linear-gradient(to top, #1b7dd2, #004D99)", "linear-gradient(45deg, #1b7dd2, #004D99)", "linear-gradient(-45deg, #1b7dd2, #004D99)", "radial-gradient(circle, #1b7dd2, #004D99)", "radial-gradient(ellipse, #1b7dd2, #004D99)",]
        return gradients[Math.floor(Math.random() * gradients.length)]
    }, []);
    const articleData = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const changeArticleIndex = useCallback(() => {
        setCurrentIndex(prevIndex => {
            return Math.round((prevIndex + 1) % category.articles.length)
        })
    }, [category.articles.length])

    useEffect(() => {
        const timer = setInterval(changeArticleIndex, 15000)

        return () => {
            clearInterval(timer)
        }
    }, [changeArticleIndex]);

    const article: Article = useMemo(() => {
        if (category.articles.length === 0) {
            return {
                title: 'Demo article',
                category: {
                    title: category.title,
                    id: category.id
                },
                id: 0,
                content: '',
                dateCreated: new Date(),
                readingTime: 0,
                dateUpdated: new Date(),
                author: {
                    firstName: 'Pisharadi',
                    lastName: 'Vargheese',
                    id: 0,
                    email: '',
                },
                image: ''
            }
        }
        return category.articles[currentIndex]
    }, [category.articles, category.id, category.title, currentIndex])

    return (<div className={'category'}
                 style={{backgroundImage: gradient}}>
        <div>
            <span className={'category-title'}>{category.title}</span>
            <div ref={articleData} className={'category-article'}>
                <h3>{article.title}</h3>
                <div>
                    <span>{article.author.firstName}</span>
                </div>
            </div>
        </div>
    </div>);
};