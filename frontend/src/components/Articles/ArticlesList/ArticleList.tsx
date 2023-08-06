import './ArticleList.css'
import {CategoryList} from "../CategoryList/CategoryList.tsx";

export const ArticleList = () => {
    return (
        <div className={'article-list'}>
            <h1>Home</h1>
            <section className={'featured-articles'}>
                <CategoryList/>
            </section>
        </div>
    );
};