import { ChangeEvent, FormEvent, useState } from "react";
import Search from "@/components/Search";
import Image from "@/components/Image";
import ScrollMask from "@/components/ScrollMask";
import styles from "./Gif.module.sass";

import { gifs } from "@/mocks/gifs";

type GifProps = {};

const Gif = ({}: GifProps) => {
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
                placeholder="Search GIF..."
                value={search}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
            />
            <ScrollMask className={styles.wrap}>
                <div className={styles.list}>
                    {gifs.map((gif, index) => (
                        <div className={styles.image} key={index}>
                            <Image
                                src={gif}
                                width={174}
                                height={128}
                                alt="GIF"
                            />
                        </div>
                    ))}
                </div>
            </ScrollMask>
        </div>
    );
};

export default Gif;
