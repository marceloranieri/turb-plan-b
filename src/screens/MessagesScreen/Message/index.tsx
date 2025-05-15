import Link from "next/link";
import cn from "classnames";
import Avatar from "components/Avatar";
import Icon from "components/Icon";
import styles from "./Message.module.sass";

type MessageProps = {
    item: {
        id: string;
        name: string;
        content: string;
        avatar: string;
        date: string;
        online: boolean;
        new: boolean;
        requestMessage: boolean;
    };
    active: string;
    onClick: () => void;
};

const Message = ({ item, active, onClick }: MessageProps) => {
    return (
        <div
            className={cn(styles.message, {
                [styles.messageRequest]: item.requestMessage,
                [styles.active]: active === item.id,
            })}
        >
            <div className={styles.link} onClick={onClick}></div>
            <Avatar
                className={styles.avatar}
                photo={item.avatar}
                href={`/profiles/${item.id}`}
                online={item.online}
            />
            <div className={styles.details}>
                <div className={styles.line}>
                    <Link className={styles.name} href={`/profiles/${item.id}`}>
                        {item.name}
                    </Link>
                    <div className={styles.date}>{item.date}</div>
                </div>
                <div className={styles.content}>{item.content}</div>
            </div>
            {item.new && <div className={styles.new}></div>}
            {item.requestMessage && (
                <button className={styles.close}>
                    <Icon name="close" />
                </button>
            )}
        </div>
    );
};

export default Message;
