import {useEffect, useState, MouseEvent} from "react";
import {Category} from "../../../types/Category.ts";
import {getCategories, getInterestedCategories, updateInteresetedCategories} from "../../../api/articlesServices.ts";
import {useLocation, useNavigate} from "react-router-dom";

export const ArticlePreferences = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getCategories().then((categories) => {
            setCategories(categories);
        }).catch((err) => {
            console.log(err);
        })
        getInterestedCategories().then((categories) => {
            setSelectedCategories(categories.map((category) => category.id));
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const [error, setError] = useState<string>('');

    const handleSubmit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (selectedCategories.length <= 3) {
            setError('Select at least 3 categories');
            return;
        }
        else {
            setError('');
            setLoading(true);
            updateInteresetedCategories(selectedCategories).then(() => {
                console.log('hai')
                if (location.state?.from) {
                    navigate(location.state.from, {replace: true});
                }
                else{
                    navigate('/', {replace: true})
                }
            }).catch(() => {
                setError('Something went wrong');
            })
        }
    }

    return (
        <div className={'auth-form'}>
        <h1>Complete setup</h1>
        <span>Select your article preferences</span>
        <form style={{width: '100%'}}>
            <div className={'preference-container'}>
                {
                    categories.map((category) => {
                        return (
                            <div
                                key={category.id}
                                className={'preference ' + (selectedCategories.includes(category.id) ? 'selected' : '')}
                                onClick={() => {
                                    if (selectedCategories.includes(category.id)) {
                                        setSelectedCategories(selectedCategories.filter((id) => id !== category.id));
                                    }
                                    else {
                                        setSelectedCategories([...selectedCategories, category.id]);
                                    }
                                }}
                            >
                                <input
                                    type={'checkbox'}
                                    name={category.title}
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                />
                                {category.title}
                            </div>
                        );
                    })
                }
            </div>
            <span className={'error'} style={{display: error ? 'block' : 'none'}}>{error}</span>
            <button
                type={'submit'}
                onClick={handleSubmit}
                disabled={loading}
            >{loading ? "Setting up..." : "Continue"}</button>
        </form>
    </div>
    );
};