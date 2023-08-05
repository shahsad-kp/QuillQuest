import './Modal.css';
import {FC, ReactNode, useEffect, useRef} from "react";

type ModalProps = {
    children: ReactNode; closeFunction: () => void;
}

export const Modal: FC<ModalProps> = ({children, closeFunction}) => {
    const modalContent = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            event.preventDefault();
            if (!event.target) return;
            const target = event.target  as HTMLElement
            if (!target?.closest('#modal')) {
                closeFunction();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();
            if (event.key === 'Escape') {
                closeFunction();
            }
        }

        if (modalContent.current) {
            modalContent.current.style.animation = 'modal-appear 0.3s forwards';
            window.addEventListener('keydown', handleKeyDown)
            window.addEventListener('mousedown', handleOutsideClick);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('mousedown', handleOutsideClick);
            };
        }
    }, [closeFunction]);

    return (<div className={'modal'}>
            <div className={'modal-content'} ref={modalContent}>
                {children}
            </div>
        </div>);
};