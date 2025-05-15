import { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import Image from "@/components/Image";
import AddMedia from "@/components/AddMedia";
import useEventsStore from "@/store/useEventsStore";
import styles from "./NewPost.module.sass";

type NewPostProps = {
    className?: string;
    classAddMedia?: string;
    classBodyAddMedia?: string;
    content: string;
    setContent: (content: string) => void;
    reply?: boolean;
    bodyUp?: boolean;
    bodyLeft?: boolean;
    full?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
};

const NewPost = ({
    className,
    classAddMedia,
    classBodyAddMedia,
    content,
    setContent,
    bodyUp,
    bodyLeft,
    reply,
    full,
    placeholder,
    autoFocus,
}: NewPostProps) => {
    const { isNewPost } = useEventsStore();

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const active = isNewPost || content !== "" || full;

    return (
        <div
            className={cn(styles.form, className, {
                [styles.active]: active,
            })}
        >
            <div className={styles.head}>
                <div className={styles.avatar}>
                    <Image
                        src="/images/avatar.png"
                        width={44}
                        height={44}
                        alt=""
                    />
                </div>
                <div className={styles.wrap}>
                    <div className={styles.field}>
                        <TextareaAutosize
                            className={styles.input}
                            placeholder={
                                placeholder ||
                                (reply
                                    ? "Post your reply..."
                                    : "Start a post...")
                            }
                            autoFocus={autoFocus}
                            value={content}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {/* <div className={styles.preview}>
                        <Image
                            src="/images/post-pic-1.jpg"
                            width={688}
                            height={304}
                            alt=""
                        />
                        <button className={cn("button-circle", styles.close)}>
                            <Icon name="close-large" />
                        </button>
                    </div> */}
                    <button
                        className={cn("button", styles.button, {
                            [styles.buttonForReply]: reply,
                        })}
                    >
                        {reply ? "Reply" : "Post"}
                    </button>
                </div>
            </div>
            {active && (
                <div className={styles.foot}>
                    <div className={styles.control}>
                        <AddMedia
                            className={classAddMedia}
                            bodyClassName={classBodyAddMedia}
                            emoji
                            bodyUp={bodyUp}
                            bodyLeft={bodyLeft}
                        />
                        <AddMedia
                            className={classAddMedia}
                            bodyClassName={classBodyAddMedia}
                            file
                            bodyUp={bodyUp}
                            bodyLeft={bodyLeft}
                        />
                        <AddMedia
                            className={classAddMedia}
                            bodyClassName={classBodyAddMedia}
                            gif
                            bodyUp={bodyUp}
                            bodyLeft={bodyLeft}
                        />
                        <AddMedia
                            className={classAddMedia}
                            bodyClassName={classBodyAddMedia}
                            tag
                            bodyUp={bodyUp}
                            bodyLeft={bodyLeft}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewPost;
