import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import Icon from "@/components/Icon";
import useEventsStore from "@/store/useEventsStore";
import styles from "./Navigation.module.sass";

import { navigation } from "@/constants/navigation";

type NavigationProps = {
    hide?: boolean;
};

const Navigation = ({ hide }: NavigationProps) => {
    const pathname = usePathname();
    const { isShowMobileNavigation } = useEventsStore();

    return (
        isShowMobileNavigation &&
        !hide && (
            <div className={styles.navigation}>
                <div className={styles.links}>
                    {navigation.map((item) => (
                        <Link
                            className={cn(styles.link, {
                                [styles.active]: pathname === item.href,
                            })}
                            key={item.id}
                            href={item.href}
                        >
                            <Icon name={item.icon} />
                            {item.counter && (
                                <div className={styles.counter}>
                                    {item.counter}
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        )
    );
};

export default Navigation;
