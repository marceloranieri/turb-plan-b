import { useState, useId } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import cn from "classnames";
import Image from "@/components/Image";
import Actions from "@/components/Actions";
import Like from "@/components/Like";
import Repost from "@/components/Repost";
import Comment from "@/components/Comment";
import Bookmark from "@/components/Bookmark";
import Share from "@/components/Share";
import Icon from "@/components/Icon";
import styles from "./Post.module.sass";

type PostProps = {
    className?: string;
    item: {
        id: string;
        name: string;
        time: string;
        avatar: string;
        content: string;
        image?: string;
        video?: string;
        likes?: {
            count: number;
            liked: boolean;
        };
        reposts?: {
            count: number;
            reposted: boolean;
        };
        comments?: number;
        bookmark?: boolean;
        following?: boolean;
    };
    actionsBodyUp?: boolean;
    isNotLink?: boolean;
    isReply?: boolean;
    bookmark?: boolean;
};

const Post = ({
    className,
    item,
    actionsBodyUp,
    isNotLink,
    isReply,
    bookmark,
}: PostProps) => {
    const [isBookmark, setIsBookmark] = useState(item.bookmark);
    const idTooltip = useId();

    const actions = [
        {
            title: "Delete",
            icon: "trash",
            onClick: () => console.log("Delete"),
        },
        {
            title: "Copy link",
            icon: "link",
            onClick: () => console.log("Copy link"),
        },
        {
            title: "Feature post",
            icon: "star",
            onClick: () => console.log("Feature post"),
        },
    ];

    return (
        <div
            className={cn(styles.post, className, {
                [styles.notLink]: isNotLink || isReply || bookmark,
                [styles.reply]: isReply,
            })}
        >
            {!isNotLink && !bookmark && (
                <Link className={styles.link} href={`/posts/${item.id}`}></Link>
            )}
            <Link className={styles.avatar} href={`/profiles/${item.id}`}>
                <Image src={item.avatar} width={44} height={44} alt="" />
            </Link>
            <div className={styles.details}>
                <div className={styles.head}>
                    <Link className={styles.name} href={`/profiles/${item.id}`}>
                        {item.name}
                    </Link>
                    <div className={styles.time}>{item.time}</div>
                </div>
                {bookmark ? (
                    <>
                        <button
                            className={cn(styles.buttonBookmark, {
                                [styles.active]: isBookmark,
                            })}
                            onClick={() => setIsBookmark(!isBookmark)}
                            data-tooltip-id={idTooltip}
                            data-tooltip-content={`${
                                isBookmark ? "Remove" : "Add"
                            } from bookmark`}
                            data-tooltip-place="left"
                        >
                            <Icon name="bookmark" />
                            <Icon name="bookmark-fill" />
                        </button>
                        <Tooltip id={idTooltip} />
                    </>
                ) : (
                    <Actions
                        className={styles.actions}
                        classBody={styles.actionsBody}
                        items={actions}
                        bodyUp={actionsBodyUp}
                    />
                )}
                <div className={styles.content}>{item.content}</div>
                {item.image && (
                    <div className={styles.image}>
                        <Image
                            src={item.image}
                            width={688}
                            height={304}
                            alt=""
                        />
                    </div>
                )}
                {item.video && (
                    <div className={styles.video}>
                        <video playsInline controls>
                            <source src={item.video} type="video/mp4" />
                        </video>
                    </div>
                )}
                {!bookmark && (
                    <div className={styles.controls}>
                        <Like
                            count={item.likes?.count}
                            initialLiked={item.likes?.liked}
                        />
                        <Repost
                            count={item.reposts?.count}
                            initialReposted={item.reposts?.reposted}
                        />
                        <Comment item={item} />
                        <Bookmark
                            className={styles.bookmark}
                            initialBookmark={item.bookmark}
                        />
                        <Share className={styles.share} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
