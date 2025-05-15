import { ChangeEvent, FormEvent, useState } from "react";
import Search from "@/components/Search";
import styles from "./Emoji.module.sass";

import { emojies } from "@/mocks/emojies";

type EmojiProps = {};

const Emoji = ({}: EmojiProps) => {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className={styles.emoji}>
            <Search
                className={styles.search}
                placeholder="Search emoji..."
                value={search}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
            />
            <div className={styles.list}>
                {emojies.map((emoji, index) => (
                    <button className={styles.button} key={index}>
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Emoji;
