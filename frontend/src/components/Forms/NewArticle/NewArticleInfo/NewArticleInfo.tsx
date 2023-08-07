import './NewArticleInfo.css';
import {ChangeEvent, FC, useEffect, KeyboardEvent, useState, useCallback, FormEvent} from "react";
import {Category} from "../../../../types/Category.ts";
import {createArticle, getCategories, updateArticle} from "../../../../api/articlesServices.ts";
import {RxCross2} from "react-icons/rx";
import {useNavigate} from "react-router-dom";

type Props = {
    title: string, image: File | null, content: string, closeFunction: () => void
    categoryId: string
    oldTags: string[], articleId?: number
}

export const NewArticleInfo: FC<Props> = ({title, content, image, closeFunction, categoryId, oldTags, articleId}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [input, setInput] = useState('');
    const [tags, setTags] = useState<string[]>(oldTags);
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryId);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCategories().then(setCategories).catch(e => {
            console.log(e)
        })

        const handleOutsideClick = (event: MouseEvent) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!event.target.closest('.new-article-form')) {
                closeFunction();
            }
        };

        window.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [closeFunction]);

    const onChange = useCallback((e: ChangeEvent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const {value} = e.target;
        setInput(value);
    }, []);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        const {key} = e;
        const trimmedInput = input.trim();

        if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            if (poppedTag) {
                setInput(poppedTag);
            }
        }

        setIsKeyReleased(false);
    }, [input, isKeyReleased, tags]);

    const onKeyUp = useCallback(() => {
        setIsKeyReleased(true);
    }, [])

    const deleteTag = useCallback((index: number) => {
        setTags(prevState => prevState.filter((_tag, i) => i !== index))
    }, [])

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError('Please select category');
            return;
        } else {
            setError('');
        }
        if (articleId) {
            updateArticle(articleId, title, content, image, tags, parseInt(selectedCategory)).then(() => {
                navigate('/');
            })
        } else {
            createArticle(title, content, image, tags, parseInt(selectedCategory)).then(() => {
                navigate('/');
            })
        }
    }, [articleId, content, image, navigate, selectedCategory, tags, title]);

    return (<div className={'new-article-info-form-out'}>
        <form
            className={'new-article-form'}
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="category">Select category</label>
                <select
                    name="Category"
                    id={'category'}
                    className={'input'}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option
                        value={''}
                    >Not Selected
                    </option>
                    {categories.map((category, index) => <option
                        key={index}
                        value={category.id}
                    >{category.title}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="category">Enter tags</label>
                <div className={'tags'}>
                    {tags.map((tag, index) => (<div className={'tag'} key={index}>
                            <span>{tag}</span>
                            <button
                                style={{
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}
                                onClick={() => deleteTag(index)}
                            >
                                <RxCross2/>
                            </button>
                        </div>))}
                </div>
                <input
                    value={input}
                    placeholder="Enter tags separated by commas"
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                    className={'input'}
                />
            </div>
            {error && <div className={'error'}>{error}</div>}
            <div>
                <button>{articleId ? 'Update' : 'Publish'}</button>
            </div>
        </form>
    </div>);
};