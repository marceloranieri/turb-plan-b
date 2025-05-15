import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { CSSTransition } from "react-transition-group";
import { useHotkeys } from "react-hotkeys-hook";
import Icon from "@/components/Icon";
import cn from "classnames";
import styles from "./Modal.module.sass";

type ModalProps = {
    className?: string;
    containerClassName?: string;
    innerClassName?: string;
    closeClassName?: string;
    visible: boolean;
    onClose?: () => void;
    hideCloseButton?: boolean;
    children: React.ReactNode;
};

const Modal = ({
    className,
    containerClassName,
    innerClassName,
    closeClassName,
    visible,
    onClose,
    hideCloseButton,
    children,
}: ModalProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const ref = useRef(null);

    useHotkeys("esc", onClose ?? (() => {}), { enableOnFormTags: true });

    useEffect(() => {
        setLoaded(true);
        return () => {
            enablePageScroll();
        };
    }, []);

    useEffect(() => {
        if (loaded) {
            visible ? disablePageScroll() : enablePageScroll();
        }
    }, [visible, loaded]);

    if (!loaded) return null;

    return createPortal(
        <CSSTransition
            classNames="modal"
            in={visible}
            timeout={400}
            nodeRef={ref}
            unmountOnExit
        >
            <div
                className={cn("modal", styles.modal, className)}
                onClick={onClose}
                data-scroll-lock-scrollable
                data-scroll-lock-fill-gap
                ref={ref}
            >
                <div
                    className={cn(
                        "modal-container",
                        styles.container,
                        containerClassName
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cn(styles.inner, innerClassName)}>
                        <div className={styles.content}>{children}</div>
                    </div>
                    {!hideCloseButton && onClose && (
                        <button
                            className={cn(
                                "button-circle",
                                styles.close,
                                closeClassName
                            )}
                            onClick={onClose}
                        >
                            <Icon name="close-large" />
                        </button>
                    )}
                </div>
            </div>
        </CSSTransition>,
        document.body
    );
};

export default Modal;
