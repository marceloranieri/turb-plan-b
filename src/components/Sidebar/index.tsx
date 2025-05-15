import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import NewPost from "@/components/NewPost";
import useEventsStore from "@/store/useEventsStore";
import NavLink from "./NavLink";
import Profile from "./Profile";
import styles from "./Sidebar.module.sass";

import { navigation } from "@/constants/navigation";

type SidebarProps = {
    className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
    const { toggleSidebar, isActiveSidebar } = useEventsStore();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<string>("");

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: isActiveSidebar,
                })}
            >
                <div className={styles.head}>
                    <Link className={styles.logo} href="/">
                        <Image
                            src="/images/logo.svg"
                            width={44}
                            height={44}
                            alt=""
                        />
                    </Link>
                    <button
                        className={cn("button-circle", styles.toggle)}
                        onClick={toggleSidebar}
                    >
                        <Icon name="toggle" />
                        <Icon name="arrow-next-big" />
                        <Icon name="close-large" />
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.menu}>
                        {navigation.map((link) => (
                            <NavLink item={link} key={link.id} />
                        ))}
                    </div>
                </div>
                <div className={styles.foot}>
                    <Profile />
                    <button
                        className={cn("button", styles.button)}
                        onClick={() => setVisibleModal(true)}
                    >
                        Post
                        <Icon name="plus" />
                    </button>
                </div>
            </div>
            <Modal
                className={styles.modal}
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                closeClassName={styles.close}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <NewPost
                    className={styles.newPost}
                    classAddMedia={styles.addMedia}
                    classBodyAddMedia={styles.bodyAddMedia}
                    content={newPost}
                    setContent={setNewPost}
                    full
                    bodyUp
                    autoFocus
                />
            </Modal>
        </>
    );
};

export default Sidebar;
