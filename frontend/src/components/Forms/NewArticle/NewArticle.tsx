import './NewArticle.css';
import {FormEvent, useCallback, useEffect, useRef, useState} from "react";

import DefaultImage from '../../../assets/default-article-image.png';
import {NewArticleInfo} from "./NewArticleInfo/NewArticleInfo.tsx";
import {useLocation, useParams} from "react-router-dom";
import {Article} from "../../../types/Article.ts";

export const NewArticle = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [articleId, setArticleId] = useState<undefined | number>();
    const [tags, setTags] = useState<string[]>([]);
    const [categoryId, setCategoryId] = useState('');

    const imageInput = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }, [])

    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        if (params.id) {
            const article: Article = location.state?.article;
            setTitle(article.title);
            setContent(article.content);
            setArticleId(article.id);
            setCategoryId(article.category.id.toString())
            setTags(article.tags);
        }
    }, [location.state?.article, params]);

    return (<>
        <form
            className={'new-article-page'}
            onSubmit={handleSubmit}
        >
            <div className={'new-article-head'}>
                <button
                    type={'submit'}
                >
                    {articleId ? 'Update' : 'Publish'}
                </button>
            </div>
            <div className={'new-article-title'}>
                <input
                    type="text"
                    placeholder={'Title'}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className={'new-article-image'}>
                <img
                    alt={'image'}
                    src={image ? URL.createObjectURL(image) : DefaultImage}
                    onClick={() => {
                        if (imageInput && imageInput.current) {
                            imageInput.current.click();
                        }
                    }}
                />
                <input
                    type="file"
                    ref={imageInput}
                    accept={'image/*'}
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImage(e.target.files[0]);
                        }
                    }}
                />
            </div>
            <div className={'new-article-content'}>
                <textarea
                    placeholder={'Content'}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </form>
        {submitted && <NewArticleInfo
            image={image}
            content={content}
            title={title}
            oldTags={tags}
            categoryId={categoryId}
            closeFunction={() => setSubmitted(false)}
            articleId={articleId}
        />}
    </>);
};