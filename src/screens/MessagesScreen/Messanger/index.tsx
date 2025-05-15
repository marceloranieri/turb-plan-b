import { useState } from "react";
import cn from "classnames";
import Avatar from "@/components/Avatar";
import Actions from "@/components/Actions";
import ScrollMask from "@/components/ScrollMask";
import Message from "@/components/Message";
import NewMessage from "@/components/NewMessage";
import Icon from "@/components/Icon";
import NoMessages from "./NoMessages";
import styles from "./Messanger.module.sass";

import { messagesList } from "@/mocks/messages";

type MessangerProps = {
    onClose?: () => void;
};

const Messanger = ({ onClose }: MessangerProps) => {
    const [snoozeNotifications, setSnoozeNotifications] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const actions = [
        {
            title: "Leave coversation",
            onClick: () => console.log("Leave coversation"),
        },
        {
            title: "Block",
            onClick: () => console.log("Block"),
        },
        {
            title: "Report",
            onClick: () => console.log("Report"),
        },
        {
            title: "Snooze notifications",
            checked: snoozeNotifications,
            onChange: () => setSnoozeNotifications(!snoozeNotifications),
        },
    ];

    return (
        <div className={cn("row-container", styles.messanger)}>
            <div className={styles.head}>
                <div className={styles.profile}>
                    <Avatar
                        className={styles.avatar}
                        photo="/images/avatar-1.png"
                        online={true}
                    />
                    Moyo Shiro
                </div>
                <Actions
                    className={styles.actions}
                    classBody={styles.actionsBody}
                    items={actions}
                    headButton
                    onlyText
                />
                <button
                    className={cn("button-circle", styles.close)}
                    onClick={onClose}
                >
                    <Icon name="close-large" />
                </button>
            </div>
            {messagesList.length > 0 ? (
                <ScrollMask className={styles.body}>
                    <div className={styles.list}>
                        {messagesList.map((item) => (
                            <Message item={item} key={item.id} />
                        ))}
                    </div>
                </ScrollMask>
            ) : (
                <NoMessages />
            )}
            <NewMessage
                className={styles.newMessage}
                content={newMessage}
                setContent={setNewMessage}
            />
        </div>
    );
};

export default Messanger;
