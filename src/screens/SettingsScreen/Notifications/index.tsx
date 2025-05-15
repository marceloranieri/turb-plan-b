import { useState } from "react";
import Item from "../Item";
import Notification from "./Notification";
import styles from "./Notifications.module.sass";

type NotificationsProps = {};

const Notifications = ({}: NotificationsProps) => {
    const [isNotification, setIsNotification] = useState(true);
    const [email, setEmail] = useState(true);
    const [sms, setSms] = useState(true);
    const [browser, setBrowser] = useState(false);
    const [news, setNews] = useState(true);
    const [updates, setUpdates] = useState(false);

    const items = [
        {
            items: [
                {
                    title: "Email",
                    icon: "envelope",
                    switchChecked: email,
                    setSwitchChecked: () => setEmail(!email),
                },
                {
                    title: "SMS",
                    icon: "mobile",
                    switchChecked: sms,
                    setSwitchChecked: () => setSms(!sms),
                },
                {
                    title: "Browser",
                    icon: "credit-card",
                    switchChecked: browser,
                    setSwitchChecked: () => setBrowser(!browser),
                },
            ],
        },
        {
            items: [
                {
                    title: "News and programs",
                    icon: "news",
                    switchChecked: news,
                    setSwitchChecked: () => setNews(!news),
                },
                {
                    title: "Product updates",
                    icon: "bell",
                    switchChecked: updates,
                    setSwitchChecked: () => setUpdates(!updates),
                },
            ],
        },
    ];

    return (
        <div className={styles.notifications}>
            {isNotification && (
                <Notification onClose={() => setIsNotification(false)} />
            )}
            {items.map((item, index) => (
                <div className={styles.group} key={index}>
                    {item.items.map((item, index) => (
                        <Item
                            className={styles.item}
                            title={item.title}
                            icon={item.icon}
                            switchToggle
                            switchChecked={item.switchChecked}
                            setSwitchChecked={item.setSwitchChecked}
                            key={index}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
