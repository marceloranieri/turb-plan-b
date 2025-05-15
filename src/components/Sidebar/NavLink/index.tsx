import { useId } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";
import { Tooltip } from "react-tooltip";
import cn from "classnames";
import Icon from "@/components/Icon";
import useEventsStore from "@/store/useEventsStore";
import styles from "./NavLink.module.sass";

type NavLinkProps = {
    item: {
        id: string;
        title: string;
        href: string;
        icon: string;
        counter?: number;
    };
};

const NavLink = ({ item }: NavLinkProps) => {
    const pathname = usePathname();
    const { isActiveSidebar } = useEventsStore();
    const idTooltip = useId();
    const matches = useMediaQuery("(min-width: 1260px)");

    return (
        <>
            <Link
                className={cn(styles.link, {
                    [styles.active]: pathname === item.href,
                    [styles.activeSidebar]: isActiveSidebar,
                })}
                key={item.id}
                href={item.href}
                data-tooltip-id={idTooltip}
                data-tooltip-content={item.title}
                data-tooltip-place="right"
            >
                <div className={styles.icon}>
                    <Icon name={item.icon} />
                    {item.counter && (
                        <div className={styles.counter}>{item.counter}</div>
                    )}
                </div>
                {item.title}
                <div className={styles.arrow}>
                    <Icon name="arrow-next" />
                </div>
            </Link>
            {isActiveSidebar && matches && <Tooltip id={idTooltip} />}
        </>
    );
};

export default NavLink;
