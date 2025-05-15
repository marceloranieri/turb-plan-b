import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import cn from "classnames";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Avatar from "@/components/Avatar";
import BlockUser from "./BlockUser";
import styles from "./AddPeople.module.sass";

import { people } from "@/mocks/people";

type AddPeopleProps = {
    onClick: () => void;
    blockUsers: boolean;
    setBlockUsers: (value: boolean) => void;
};

const AddPeople = ({ onClick, blockUsers, setBlockUsers }: AddPeopleProps) => {
    const [selected, setSelected] = useState(["Treva"]);

    return (
        <div className={styles.AddPeople}>
            {blockUsers ? (
                <BlockUser />
            ) : (
                <>
                    <div className={styles.head}>
                        <div className={styles.search}>
                            <button className={styles.result}>
                                <Icon name="search" />
                            </button>
                            <div className={cn("rti", styles.tags)}>
                                <TagsInput
                                    classNames={{
                                        input: styles.input,
                                        tag: styles.tag,
                                    }}
                                    value={selected}
                                    onChange={setSelected}
                                    name="people"
                                    placeHolder="Search people"
                                />
                            </div>
                        </div>
                        <button
                            className={cn("button-circle", styles.button)}
                            onClick={onClick}
                        >
                            <Icon name="arrow-right" />
                        </button>
                    </div>
                    <ScrollMask className={styles.body}>
                        <div className={styles.list}>
                            {people.map((person, index) => (
                                <div
                                    className={cn(styles.item, {
                                        [styles.checked]: index === 0,
                                    })}
                                    key={person.id}
                                    onClick={() => setBlockUsers(true)}
                                >
                                    <Avatar
                                        photo={person.avatar}
                                        online={person.online}
                                    />
                                    <div className={styles.details}>
                                        <div className={styles.name}>
                                            {person.name}
                                        </div>
                                        <div className={styles.login}>
                                            @{person.login}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollMask>
                </>
            )}
        </div>
    );
};

export default AddPeople;
