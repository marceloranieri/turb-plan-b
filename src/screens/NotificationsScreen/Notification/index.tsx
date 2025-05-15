import Image from "@/components/Image";
import styles from "./Notification.module.sass";

type NotificationProps = {
    item: {
        id: string;
        type: "like" | "repost" | "follow" | "comment";
        title: string;
        avatar: string;
        content?: React.ReactNode;
        date: string;
    };
};

const Notification = ({ item }: NotificationProps) => (
    <div className={styles.notification}>
        <div className={styles.avatar}>
            <Image
                className={styles.photo}
                src={item.avatar}
                width={44}
                height={44}
                alt={item.title}
            />
            <div
                className={styles.status}
                style={{
                    backgroundColor:
                        item.type === "like"
                            ? "#BD3027"
                            : item.type === "repost"
                            ? "#21B27E"
                            : item.type === "comment"
                            ? "#127DFB"
                            : "#8B33E2",
                }}
            >
                <Image
                    src={
                        item.type === "like"
                            ? "/images/notification-like.svg"
                            : item.type === "repost"
                            ? "/images/notification-repost.svg"
                            : item.type === "comment"
                            ? "/images/notification-comment.svg"
                            : "/images/notification-follow.svg"
                    }
                    width={12}
                    height={12}
                    alt=""
                />
            </div>
            <svg width="0" height="0" style={{ display: "block" }}>
                <clipPath
                    id="maskAvatarNotification"
                    clipPathUnits="objectBoundingBox"
                >
                    <path d="M.92.556c.031.008.046.013.055.01S.989.559.994.552 1 .532 1 .508A.5.5 0 0 0 .5 0a.5.5 0 1 0 0 1C.532 1 .543.999.552.994S.564.983.566.975.565.95.556.92C.549.895.545.868.545.841.545.678.678.545.841.545.868.545.895.549.92.556z" />
                </clipPath>
            </svg>
        </div>
        <div className={styles.details}>
            <div className={styles.head}>
                <span className={styles.title}>{item.title}</span>
                {item.type === "like" && (
                    <span className={styles.info}>&nbsp;liked your post</span>
                )}
                {item.type === "repost" && (
                    <span className={styles.info}>
                        &nbsp;reposted your post
                    </span>
                )}
                {item.type === "comment" && (
                    <span className={styles.info}>
                        &nbsp;commented on your post
                    </span>
                )}
            </div>
            {item.type === "follow" && (
                <div className={styles.info}>follow you</div>
            )}
            {item.content && (
                <div className={styles.content}>{item.content}</div>
            )}
            <div className={styles.date}>{item.date}</div>
        </div>
    </div>
);

export default Notification;
