import Link from "next/link";
import cn from "classnames";
import useEventsStore from "@/store/useEventsStore";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Avatar from "@/components/Avatar";
import styles from "./Header.module.sass";

type HeaderProps = {
    onAddPost: () => void;
    onOpenSearch: () => void;
};

const Header = ({ onAddPost, onOpenSearch }: HeaderProps) => {
    const { isNewPost, openSidebar, closeMobileNavigation } = useEventsStore();

    return (
        <div className={styles.header}>
            <Link className={styles.logo} href="/">
                <Image src="/images/logo.svg" width={44} height={44} alt="" />
            </Link>
            <button
                className={cn("button-circle", styles.buttonNewPost, {
                    [styles.active]: isNewPost,
                })}
                type="button"
                onClick={onAddPost}
            >
                <Icon name="plus" />
            </button>
            <button
                className={cn("button-circle", styles.button)}
                type="button"
                onClick={() => {
                    onOpenSearch();
                    closeMobileNavigation();
                }}
            >
                <Icon name="search" />
            </button>
            <Avatar
                className={styles.avatar}
                photo="/images/avatar.png"
                onClick={openSidebar}
                online
            />
        </div>
    );
};

export default Header;
