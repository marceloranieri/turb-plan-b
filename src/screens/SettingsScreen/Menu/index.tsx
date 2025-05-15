import cn from "classnames";
import Avatar from "@/components/Avatar";
import Icon from "@/components/Icon";
import styles from "./Menu.module.sass";

type MenuProps = {
    activeId: string;
    items: {
        id: string;
        icon: string;
        title: string;
        onClick: (id: string) => void;
    }[];
};

const Menu = ({ activeId, items }: MenuProps) => (
    <div className={styles.menu}>
        {items.map((item) => (
            <div
                className={cn(styles.item, {
                    [styles.active]:
                        activeId === item.id && activeId !== "contact-support",
                })}
                key={item.id}
                onClick={() => item.onClick(item.id)}
            >
                {item.id === "account-settings" ? (
                    <>
                        <Avatar
                            className={styles.avatar}
                            photo="/images/avatar.png"
                            online
                        />
                        <div className={styles.details}>
                            <div className={styles.name}>Kohaku Tora</div>
                            <div className={styles.login}>@kohaku_tora</div>
                        </div>
                        <div className={styles.arrow}>
                            <Icon name="arrow-down" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.icon}>
                            <Icon name={item.icon} />
                        </div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.arrow}>
                            <Icon name="arrow-down" />
                        </div>
                    </>
                )}
            </div>
        ))}
    </div>
);

export default Menu;
