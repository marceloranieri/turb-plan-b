import { useRef, useState, useId } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import useEventsStore from "@/store/useEventsStore";
import styles from "./Profile.module.sass";

const items = [
    {
        icon: "settings",
        href: "/settings",
        tooltip: "Settings",
    },
    {
        icon: "logout",
        href: "/entry",
        tooltip: "Logout",
    },
];

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));
    const idTooltip = useId();
    const { isActiveSidebar } = useEventsStore();
    const matches = useMediaQuery("(min-width: 1260px)");

    return (
        <div
            className={cn(styles.profile, {
                [styles.active]: visible,
                [styles.activeSidebar]: isActiveSidebar,
            })}
            ref={ref}
        >
            <div className={styles.head} onClick={() => setVisible(!visible)}>
                <Avatar
                    className={styles.avatar}
                    photo="/images/avatar.png"
                    online={true}
                />
                <div className={styles.details}>
                    <div className={styles.name}>Kohaku</div>
                    <div className={styles.login}>@kohaku</div>
                </div>
                <div className={styles.dots}>
                    <Icon name="dots-horizontal" />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.items}>
                    {items.map((item, index) => (
                        <Link
                            className={styles.item}
                            key={index}
                            href={item.href}
                            data-tooltip-id={idTooltip}
                            data-tooltip-content={item.tooltip}
                            data-tooltip-place="left"
                        >
                            <Icon name={item.icon} />
                        </Link>
                    ))}
                </div>
                {matches && <Tooltip id={idTooltip} />}
            </div>
        </div>
    );
};

export default Profile;
