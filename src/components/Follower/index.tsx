import Link from "next/link";
import cn from "classnames";
import FollowButton from "@/components/FollowButton";
import Actions from "@/components/Actions";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import styles from "./Follower.module.sass";

type FollowerProps = {
    item: {
        id: string;
        name: string;
        username: string;
        avatar: string;
        online: boolean;
        content: string;
        isFollowing: boolean;
    };
    isActions?: boolean;
    isBlocked?: boolean;
    actionsBodyUp?: boolean;
};

const Follower = ({
    item,
    isActions,
    isBlocked,
    actionsBodyUp,
}: FollowerProps) => {
    const actions = [
        {
            title: "Block",
            icon: "lock",
            onClick: () => console.log("Block"),
        },
        {
            title: "Copy link",
            icon: "copy",
            onClick: () => console.log("Copy link"),
        },
        {
            title: "Copy profile link",
            icon: "link",
            onClick: () => console.log("Copy profile link"),
        },
        {
            title: "Snooze",
            icon: "eye-slash",
            onClick: () => console.log("Snooze"),
        },
    ];

    return (
        <div
            className={cn(styles.follower, {
                [styles.followerActions]: isActions,
                [styles.followerBlocked]: isBlocked,
            })}
        >
            <div className={styles.line}>
                <Avatar
                    photo={item.avatar}
                    href={`/profiles/${item.id}`}
                    online={item.online}
                />
                <div className={styles.details}>
                    <Link className={styles.name} href={`/profiles/${item.id}`}>
                        {item.name}
                    </Link>
                    <Link
                        className={styles.username}
                        href={`/profiles/${item.id}`}
                    >
                        {item.username}
                    </Link>
                    {isActions && (
                        <Actions
                            className={styles.actions}
                            classHead={styles.actionsHead}
                            classBody={styles.actionsBody}
                            items={actions}
                            headButton
                            reverse
                            bodyUp={actionsBodyUp}
                        />
                    )}
                    {isBlocked ? (
                        <button className={cn("button", styles.buttonBlocked)}>
                            Unblock
                            <Icon name="close-large" />
                        </button>
                    ) : (
                        <FollowButton
                            className={styles.followButton}
                            value={item.isFollowing}
                        />
                    )}
                </div>
            </div>
            <div className={styles.content}>{item.content}</div>
        </div>
    );
};

export default Follower;
