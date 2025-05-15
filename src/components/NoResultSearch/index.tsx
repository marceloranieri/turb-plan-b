import cn from "classnames";
import Image from "@/components/Image";
import useEventsStore from "@/store/useEventsStore";
import styles from "./NoResultSearch.module.sass";

type NoResultSearchProps = {
    search: string;
};

const NoResultSearch = ({ search }: NoResultSearchProps) => {
    const { isShowMobileNavigation } = useEventsStore();
    return (
        <div className={styles.noResultSearch}>
            <div className={styles.preview}>
                <Image
                    src="/images/empty-pic-3.png"
                    width={350}
                    height={524}
                    alt=""
                />
            </div>
            <div
                className={cn(styles.text, {
                    [styles.textWithNavigation]: isShowMobileNavigation,
                })}
            >
                No result for “<span>{search}</span>” try again
            </div>
        </div>
    );
};

export default NoResultSearch;
