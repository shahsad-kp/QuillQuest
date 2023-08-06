import {Category} from "../../../types/Category.ts";
import {FC} from "react";
import './CategorySelector.css'
import {useSearchParams} from "react-router-dom";

type Props = {
    categories: Category[];
}

export const CategorySelector: FC<Props> = ({categories}) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <div className={'category-selector'}>
            <div>
                <button
                    className={`category ${!searchParams.has('category') ? 'selected' : ''}`}
                    onClick={() => {
                        setSearchParams({});
                    }}
                >
                    All
                </button>
                {categories.map(category => (<button
                    key={category.id}
                    className={`category ${searchParams.get('category') === category.title ? 'selected' : ''}`}
                    onClick={() => {
                        setSearchParams({category: category.title});
                    }}
                >
                    {category.title}
                </button>))}
            </div>
        </div>
    );
};