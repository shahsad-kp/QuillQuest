import './NewArticle.css';
import {FormEvent, useCallback, useRef, useState} from "react";

import DefaultImage from '../../../assets/default-article-image.png';
import {NewArticleInfo} from "./NewArticleInfo/NewArticleInfo.tsx";

export const NewArticle = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const imageInput = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }, [])

    return (<>
        <form
            className={'new-article-page'}
            onSubmit={handleSubmit}
        >
            <div className={'new-article-head'}>
                <button
                    type={'submit'}
                >
                    Publish
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
            closeFunction={() => setSubmitted(false)}
        />}
    </>);
};