import { ChangeEvent, FormEvent, useState } from "react";
import Search from "@/components/Search";
import Avatar from "@/components/Avatar";
import ScrollMask from "@/components/ScrollMask";
import styles from "./Tag.module.sass";

import { people } from "@/mocks/people";

type TagProps = {};

const Tag = ({}: TagProps) => {
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
                placeholder="Search people..."
                value={search}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
            />
            <ScrollMask className={styles.wrap}>
                <div className={styles.list}>
                    {people.map((person) => (
                        <div className={styles.item} key={person.id}>
                            <Avatar
                                photo={person.avatar}
                                online={person.online}
                            />
                            <div className={styles.details}>
                                <div className={styles.name}>{person.name}</div>
                                <div className={styles.login}>
                                    @{person.login}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollMask>
        </div>
    );
};

export default Tag;
