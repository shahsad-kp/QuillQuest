import './NewArticle.css';
import {useRef, useState} from "react";

import DefaultImage from '../../../assets/default-article-image.png';

export const NewArticle = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<File|null>(null);
    const [content, setContent] = useState('');

    const imageInput = useRef<HTMLInputElement>(null);

    return (
        <div className={'new-article-page'}>
            <div className={'new-article-head'}>
                <button>
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
        </div>
    );
};