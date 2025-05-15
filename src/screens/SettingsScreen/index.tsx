"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Modal from "@/components/Modal";
import useEventsStore from "@/store/useEventsStore";
import Menu from "./Menu";
import AccountSettings from "./AccountSettings";
import Notifications from "./Notifications";
import Preferences from "./Preferences";
import BlockedAccounts from "./BlockedAccounts";
import ContactSupport from "./ContactSupport";
import styles from "./SettingsScreen.module.sass";

const SettingsScreen = ({}) => {
    const { openMobileNavigation, closeMobileNavigation } = useEventsStore();
    const [isMounted, setIsMounted] = useState(false);
    const mobile = useMediaQuery("(max-width: 767px)");
    const [search, setSearch] = useState("");
    const searchParams = useSearchParams();
    const section = searchParams.get("section");
    const [activeId, setActiveId] = useState(
        mobile ? section || "" : section || "account-settings"
    );
    const [visible, setVisible] = useState(section || false);
    const [visibleModal, setVisibleModal] = useState(false);
    const router = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const menu = [
        {
            id: "account-settings",
            icon: "user",
            title: "Account settings",
            onClick: () => {
                setActiveId("account-settings");
                setVisible(true);
                closeMobileNavigation();
            },
        },
        {
            id: "notifications",
            icon: "heart",
            title: "Notifications",
            onClick: () => {
                setActiveId("notifications");
                setVisible(true);
                closeMobileNavigation();
            },
        },
        {
            id: "preferences",
            icon: "eye",
            title: "Preferences",
            onClick: () => {
                setActiveId("preferences");
                setVisible(true);
                closeMobileNavigation();
            },
        },
        {
            id: "blocked-accounts",
            icon: "block",
            title: "Blocked accounts",
            onClick: () => {
                setActiveId("blocked-accounts");
                setVisible(true);
                closeMobileNavigation();
            },
        },
        {
            id: "contact-support",
            icon: "headphones",
            title: "Contact support",
            onClick: () => setVisibleModal(true),
        },
    ];

    if (!isMounted) return null;

    return (
        <>
            <Layout classSidebar={styles.sidebarLeft}>
                <div
                    className={cn("row", styles.row, {
                        [styles.visible]: visible,
                    })}
                >
                    <div className={cn("row-sidebar", styles.rowSidebar)}>
                        <div className={styles.head}>
                            <button
                                className={cn("button-circle", styles.back)}
                                onClick={() => router.back()}
                            >
                                <Icon name="arrow-left" />
                            </button>
                            <Search
                                className={styles.search}
                                placeholder="Search settings..."
                                value={search}
                                onChange={handleSearchChange}
                                onSubmit={handleSearchSubmit}
                            />
                        </div>
                        <ScrollMask className={styles.body}>
                            <Menu items={menu} activeId={activeId} />
                        </ScrollMask>
                    </div>
                    <div className={cn("row-container", styles.rowContainer)}>
                        <div className={styles.head}>
                            <button
                                className={cn("button-circle", styles.back)}
                                onClick={() => {
                                    setActiveId("");
                                    setVisible(false);
                                    openMobileNavigation();
                                }}
                            >
                                <Icon name="arrow-left" />
                            </button>
                            <div className={styles.title}>
                                {activeId === "notifications"
                                    ? "Notifications"
                                    : activeId === "preferences"
                                    ? "Preferences"
                                    : activeId === "blocked-accounts"
                                    ? "Blocked accounts"
                                    : "Account settings"}
                            </div>
                            <div className={styles.buttons}>
                                <button className={cn("button", styles.button)}>
                                    Save
                                </button>
                            </div>
                        </div>
                        <ScrollMask className={styles.body}>
                            {activeId === "account-settings" && (
                                <AccountSettings />
                            )}
                            {activeId === "notifications" && <Notifications />}
                            {activeId === "preferences" && <Preferences />}
                            {activeId === "blocked-accounts" && (
                                <BlockedAccounts />
                            )}
                        </ScrollMask>
                    </div>
                </div>
            </Layout>
            <Modal
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                closeClassName={styles.closeModal}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <ContactSupport />
            </Modal>
        </>
    );
};

export default SettingsScreen;
