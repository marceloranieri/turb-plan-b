import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Post from "@/components/Post";
import NewPost from "@/components/NewPost";
import styles from "./Comment.module.sass";

type CommentProps = {
    item?: any;
};

const Comment = ({ item }: CommentProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<string>("");
    const mobile = useMediaQuery("(max-width: 767px)");

    return (
        <>
            <button
                className={cn("social", styles.comment)}
                onClick={() => setVisibleModal(true)}
            >
                <Icon name="comment" />
                {item.comments !== undefined && item.comments > 0 && (
                    <div className={styles.count}>{item.comments}</div>
                )}
            </button>
            <Modal
                className={styles.modal}
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideCloseButton
            >
                <div className={styles.head}>
                    <button
                        className={cn("button-circle", styles.button)}
                        onClick={() => setVisibleModal(false)}
                    >
                        <Icon name="arrow-left" />
                    </button>
                    <div className={styles.title}>Replying to {item.name}</div>
                </div>
                <Post className={styles.post} item={item} />
                <NewPost
                    className={styles.newPost}
                    classAddMedia={styles.addMedia}
                    classBodyAddMedia={styles.bodyAddMedia}
                    content={newPost}
                    setContent={setNewPost}
                    placeholder={`Reply to ${item.name}...`}
                    full
                    reply
                    bodyUp
                    autoFocus={!mobile}
                />
            </Modal>
        </>
    );
};

export default Comment;
