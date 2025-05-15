import { useState, ChangeEvent, FormEvent } from "react";
import cn from "classnames";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import AddPeople from "../AddPeople";
import styles from "./Head.module.sass";

type HeadProps = {
    search: string;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
    tabs: { title: string; value: string }[];
    tab: string;
    setTab: (value: string) => void;
};

const Head = ({
    search,
    handleSearchChange,
    handleSearchSubmit,
    tabs,
    tab,
    setTab,
}: HeadProps) => {
    const [visibleModal, setVisibleModal] = useState(false);
    const [blockUsers, setBlockUsers] = useState(false);

    return (
        <>
            <div className={styles.head}>
                <div className={styles.line}>
                    <Search
                        className={styles.search}
                        placeholder="Search conversation..."
                        value={search}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}
                    />
                    <button
                        className={cn("button-circle", styles.button)}
                        onClick={() => setVisibleModal(true)}
                    >
                        <Icon name="plus" />
                    </button>
                </div>
                {search === "" && (
                    <Tabs
                        className={styles.tabs}
                        items={tabs}
                        value={tab}
                        setValue={setTab}
                    />
                )}
            </div>
            <Modal
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                closeClassName={styles.closeModal}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideCloseButton={!blockUsers}
            >
                <AddPeople
                    onClick={() => setVisibleModal(false)}
                    blockUsers={blockUsers}
                    setBlockUsers={setBlockUsers}
                />
            </Modal>
        </>
    );
};

export default Head;
